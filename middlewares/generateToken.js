import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = async (req, res, next) => {
  try {
    const secretKey = process.env.STK_SECRET_KEY;
    const consumerKey = process.env.STK_CONSUMER_KEY;
    const auth = Buffer.from(`${consumerKey}:${secretKey}`).toString("base64");  

    const response = await axios.get(process.env.STK_URL, {
      headers: {
        "Authorization": `Basic ${auth}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    req.token = response.data.access_token;  // Store the token in the req object
    next();
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(400).json({
      error: error.message,
      details: error.response ? error.response.data : {}
    });
  }
};

export default generateToken;
