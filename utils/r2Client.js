import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: String(process.env.R2_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.R2_SECRET_ACCESS_KEY),
  },
  forcePathStyle: true, // 🔑 REQUIRED for Cloudflare R2
});

export default r2Client;
