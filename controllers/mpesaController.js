import { poolUsers } from "../db.js";
import axios from "axios";
import dotenv from "dotenv";
import { URLSearchParams } from "url";
dotenv.config();


console.log("SHORT_CODE:", process.env.SHORT_CODE);

export const stkPush = async (req, res) => {
    const { SHORT_CODE: shortCode, TILL: till, PASSKEY: passkey, CALLBACK_URL: callbackUrl, API_URL: apiUrl } = process.env;
    const token = req.token;

    try {
        if (!shortCode || !passkey || !callbackUrl || !token || !apiUrl) {
            throw new Error("Missing required environment variables");
        }

        const { user_id: userId, phoneNumber, amount } = req.body;
        const formattedPhoneNumber = phoneNumber.substring(1); // Remove the leading 0
        const date = new Date();
        const timestamp = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
        const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");

        const response = await axios.post(apiUrl, {
            BusinessShortCode: shortCode,   // TILL number
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerBuyGoodsOnline",
            Amount: amount,
            PartyA: `254${formattedPhoneNumber}`,
            PartyB: shortCode,              // MUST be same as BusinessShortCode
            PhoneNumber: `254${formattedPhoneNumber}`,
            CallBackURL: callbackUrl,
            AccountReference: `254${formattedPhoneNumber}`,
            TransactionDesc: "Purchase of Goods"
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });


        const { CheckoutRequestID } = response.data;

        // Save the CheckoutRequestID with the userId
        await saveStkRequest(userId, CheckoutRequestID, '', '', `254${formattedPhoneNumber}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in STK Push request:', error);
        res.status(500).json({ error: error.message, details: error.response?.data || {} });
    }
};

const saveStkRequest = async (userId, checkoutRequestID, mpesaReceiptNumber, transactionDate, phoneNumber) => {
    try {
        // Log the parameters being saved

        console.log('User ID:', userId);
        console.log('Checkout Request ID:', checkoutRequestID);
        console.log('M-Pesa Receipt Number:', mpesaReceiptNumber);
        console.log('Transaction Date:', transactionDate);
        console.log('Phone Number:', phoneNumber);

        const [rows] = await poolUsers.query("SELECT user_id FROM elimufi1_users.signup WHERE user_id = ?", [userId]);

        const query = rows.length > 0
            ? "UPDATE elimufi1_users.signup SET checkoutRequestID = ?, MpesaReceiptNumber = ?, TransactionDate = ?, PhoneNumber = ? WHERE user_id = ?"
            : "INSERT INTO elimufi1_users.signup (user_id, checkoutRequestID, MpesaReceiptNumber, TransactionDate, PhoneNumber) VALUES (?, ?, ?, ?, ?)";
        const params = rows.length > 0
            ? [checkoutRequestID, mpesaReceiptNumber, transactionDate, phoneNumber, userId]
            : [userId, checkoutRequestID, mpesaReceiptNumber, transactionDate, phoneNumber];

        await poolUsers.query(query, params);
    } catch (error) {
        console.error('Error saving STK request to database:', error);
        throw error;
    }
};


export const callBack = async (req, res) => {
    // ✅ ALWAYS acknowledge Safaricom immediately
    res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });

    try {
        console.log("🔥 MPESA CALLBACK RECEIVED 🔥");
        console.log(JSON.stringify(req.body, null, 2));

        const stkCallback = req.body?.Body?.stkCallback;

        if (!stkCallback) {
            console.warn("⚠️ Missing stkCallback");
            return;
        }

        const {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
        } = stkCallback;

        // ❌ Handle failed / cancelled transactions FIRST
        if (ResultCode !== 0) {
            console.warn("❌ Transaction failed:", ResultDesc);
            await handleFailedTransaction(
                CheckoutRequestID,
                ResultCode,
                ResultDesc
            );
            return;
        }

        // ✅ SUCCESS PAYMENTS ONLY
        if (!CallbackMetadata || !Array.isArray(CallbackMetadata.Item)) {
            console.warn("⚠️ Missing CallbackMetadata on success");
            return;
        }

        const metadata = CallbackMetadata.Item.reduce((acc, item) => {
            acc[item.Name] = item.Value;
            return acc;
        }, {});

        const {
            Amount,
            MpesaReceiptNumber,
            TransactionDate,
            PhoneNumber
        } = metadata;

        if (!Amount || !MpesaReceiptNumber || !TransactionDate || !PhoneNumber) {
            console.warn("⚠️ Incomplete metadata", metadata);
            return;
        }

        const userId = await getUserIdByCheckoutRequestID(CheckoutRequestID);

        if (!userId) {
            console.warn("⚠️ User not found for CheckoutRequestID", CheckoutRequestID);
            return;
        }

        await updateSubscription(userId, {
            Amount,
            MpesaReceiptNumber,
            TransactionDate,
            PhoneNumber,
            Status: 'Paid'
        });

        console.log("✅ Subscription updated for user:", userId);

    } catch (error) {
        console.error("❌ Callback processing error:", error);
    }
};



const handleFailedTransaction = async (checkoutRequestID, resultCode, resultDesc) => {
    try {
        const userId = await getUserIdByCheckoutRequestID(checkoutRequestID);

        if (userId) {
            await updateSubscription(userId, {
                Amount: null,
                MpesaReceiptNumber: '',
                TransactionDate: '',
                PhoneNumber: '',
                Status: 'Failed',
                FailureReason: resultDesc
            });
            console.log(`Failed transaction logged for user ID: ${userId}`);
        } else {
            console.error(`User ID not found for CheckoutRequestID: ${checkoutRequestID}`);
        }
    } catch (error) {
        console.error('Error handling failed transaction:', error);
    }
};

const getUserIdByCheckoutRequestID = async (checkoutRequestID) => {
    try {
        const sql = "SELECT user_id FROM elimufi1_users.signup WHERE checkoutRequestID = ?";
        const [rows] = await poolUsers.query(sql, [checkoutRequestID]);
        return rows.length > 0 ? rows[0].user_id : null;
    } catch (error) {
        console.error('Error fetching user ID by CheckoutRequestID:', error);
        throw error;
    }
};

const updateSubscription = async (userId, updateFields) => {
    try {
        const setClause = Object.keys(updateFields).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updateFields);
        values.push(userId);
        const sql = `UPDATE elimufi1_users.signup SET ${setClause} WHERE user_id = ?`;

        await poolUsers.query(sql, values);
    } catch (error) {
        console.error('Error updating subscription in database:', error);
        throw error;
    }
};

export const getSubscriptionStatus = async (req, res) => {
    const { userId } = req.params;
    try {
        const [subscriptionStatus] = await poolUsers.query('SELECT Amount FROM elimufi1_users.signup WHERE user_id = ?', [userId]);
        if (subscriptionStatus.length > 0) {
            res.json(subscriptionStatus[0]);
        } else {
            res.status(404).json({ message: 'Subscription status not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAdministrationStatus = async (req, res) => {
    const { userId } = req.params;
    try {
        const [administrationStatus] = await poolUsers.query('SELECT isAdmin FROM elimufi1_users.signup WHERE user_id = ?', [userId]);
        if (administrationStatus.length > 0) {
            res.json(administrationStatus[0]);
        } else {
            res.status(404).json({ message: 'Administration status not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};