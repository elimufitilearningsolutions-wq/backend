import { poolUsers } from "../db.js";
import axios from "axios";
import dotenv from "dotenv";
import { io } from "../server.js";

dotenv.config();

/* =====================================================
   STK PUSH
===================================================== */
export const stkPush = async (req, res) => {
  const {
    SHORT_CODE: shortCode,
    TILL: till,
    PASSKEY: passkey,
    CALLBACK_URL: callbackUrl,
    API_URL: apiUrl,
  } = process.env;
  const token = req.token;

  console.log("📤 STK Push requested:", req.body);

  try {
    if (!shortCode || !passkey || !callbackUrl || !apiUrl || !token) {
      throw new Error("Missing required environment variables");
    }

    const { user_id: userId, phoneNumber, amount } = req.body;
    if (!userId || !phoneNumber || !amount) {
      console.log("❌ Missing required fields in request");
      return res.status(400).json({
        error: "user_id, phoneNumber, and amount are required",
      });
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    const timestamp = generateTimestamp();
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");
    const Transaction_type =  process.env.TRANSACTION_TYPE
    console.log(`📲 Sending STK push for user ${userId}, amount KES ${amount}`);

    const response = await axios.post(
      apiUrl,
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: Transaction_type,
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: till,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: formattedPhone,
        TransactionDesc: "Purchase of Goods",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ STK push response received:", response.data);

    const { CheckoutRequestID } = response.data;
    console.log("🆔 CheckoutRequestID:", CheckoutRequestID);

    await saveStkRequest(userId, CheckoutRequestID, "", "", formattedPhone);
    console.log("💾 STK request saved to DB for user:", userId);

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ STK Push error:", error);
    return res.status(500).json({
      error: error.message,
      details: error.response?.data || {},
    });
  }
};

/* =====================================================
   CALLBACK HANDLER
===================================================== */
export const callBack = async (req, res) => {
  res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  console.log("🔥 MPESA CALLBACK RECEIVED:", JSON.stringify(req.body, null, 2));

  try {
    const stkCallback = req.body?.Body?.stkCallback;
    if (!stkCallback) return console.log("No stkCallback in request body");

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;
    const userId = await getUserIdByCheckoutRequestID(CheckoutRequestID);
    if (!userId) return console.log("User not found for CheckoutRequestID:", CheckoutRequestID);

    if (ResultCode !== 0) {
      console.log(`⚠️ Payment failed for user ${userId}: ${ResultDesc}`);
      await updateSubscription(userId, { Status: "Failed", FailureReason: ResultDesc });

      io.to(`user_${userId}`).emit("paymentFailed", {
        status: "Failed",
        reason: ResultDesc,
      });
      console.log("✅ paymentFailed emitted to socket room:", `user_${userId}`);
      return;
    }

    if (!CallbackMetadata?.Item) return console.log("CallbackMetadata.Item missing");

    const metadata = Object.fromEntries(
      CallbackMetadata.Item.map((item) => [item.Name, item.Value])
    );

    const { Amount, MpesaReceiptNumber, TransactionDate, PhoneNumber } = metadata;
    if (!MpesaReceiptNumber) return console.log("Missing MpesaReceiptNumber");

    const [rows] = await poolUsers.query(
      "SELECT Amount FROM elimufi1_users.signup WHERE user_id = ?",
      [userId]
    );

    const finalAmount =
  Number(rows[0]?.Amount ?? 0) +
  Number(Amount ?? 0);


    await updateSubscription(userId, {
      Amount: finalAmount,
      MpesaReceiptNumber,
      TransactionDate,
      PhoneNumber,
      Status: "Paid",
    });

    console.log(`💰 Payment successful for user ${userId}, amount KES ${finalAmount}`);

    io.to(`user_${userId}`).emit("paymentSuccess", {
      status: "Paid",
      Amount: finalAmount,
      MpesaReceiptNumber,
      TransactionDate,
    });
    console.log("✅ paymentSuccess emitted to socket room:", `user_${userId}`);
  } catch (error) {
    console.error("❌ Callback processing error:", error);
  }
};

/* =====================================================
   DATABASE HELPERS
===================================================== */
const saveStkRequest = async (userId, checkoutRequestID, mpesaReceiptNumber, transactionDate, phoneNumber) => {
  try {
    const [rows] = await poolUsers.query(
      "SELECT user_id FROM elimufi1_users.signup WHERE user_id = ?",
      [userId]
    );
    const exists = rows.length > 0;

    const query = exists
      ? `UPDATE elimufi1_users.signup
         SET checkoutRequestID = ?, MpesaReceiptNumber = ?, TransactionDate = ?, PhoneNumber = ?
         WHERE user_id = ?`
      : `INSERT INTO elimufi1_users.signup
         (user_id, checkoutRequestID, MpesaReceiptNumber, TransactionDate, PhoneNumber)
         VALUES (?, ?, ?, ?, ?)`;

    const params = exists
      ? [checkoutRequestID, mpesaReceiptNumber, transactionDate, phoneNumber, userId]
      : [userId, checkoutRequestID, mpesaReceiptNumber, transactionDate, phoneNumber];

    await poolUsers.query(query, params);
  } catch (error) {
    console.error("❌ Error saving STK request:", error);
    throw error;
  }
};

const getUserIdByCheckoutRequestID = async (checkoutRequestID) => {
  try {
    const [rows] = await poolUsers.query(
      "SELECT user_id FROM elimufi1_users.signup WHERE checkoutRequestID = ?",
      [checkoutRequestID]
    );
    return rows.length > 0 ? rows[0].user_id : null;
  } catch (error) {
    console.error("❌ Error fetching user by CheckoutRequestID:", error);
    throw error;
  }
};

const updateSubscription = async (userId, updateFields) => {
  try {
    const setClause = Object.keys(updateFields).map((field) => `${field} = ?`).join(", ");
    const values = [...Object.values(updateFields), userId];
    const sql = `UPDATE elimufi1_users.signup SET ${setClause} WHERE user_id = ?`;
    await poolUsers.query(sql, values);
  } catch (error) {
    console.error("❌ Error updating subscription:", error);
    throw error;
  }
};

/* =====================================================
   UTILITIES
===================================================== */
const generateTimestamp = () => {
  const date = new Date();
  return (
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0") +
    date.getHours().toString().padStart(2, "0") +
    date.getMinutes().toString().padStart(2, "0") +
    date.getSeconds().toString().padStart(2, "0")
  );
};

const formatPhoneNumber = (phone) => {
  if (phone.startsWith("0")) return `254${phone.substring(1)}`;
  if (phone.startsWith("254")) return phone;
  throw new Error("Invalid phone number format");
};

/* =====================================================
   SUBSCRIPTION STATUS ENDPOINTS
===================================================== */
export const getSubscriptionStatus = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await poolUsers.query(
      "SELECT Amount, Status, FailureReason FROM signup WHERE user_id = ?",
      [userId]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Subscription status not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error("❌ getSubscriptionStatus error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAdministrationStatus = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await poolUsers.query(
      "SELECT isAdmin FROM elimufi1_users.signup WHERE user_id = ?",
      [userId]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Administration status not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error("❌ getAdministrationStatus error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
