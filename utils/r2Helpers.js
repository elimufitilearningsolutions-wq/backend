import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import r2Client from "./r2Client.js";
import dotenv from "dotenv";

dotenv.config();

// UPLOAD
export const uploadToR2 = async (fileName, fileBuffer, contentType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
    ContentDisposition: 'inline'
  });

  const response = await r2Client.send(command);
  console.log("R2 upload metadata:", response.$metadata);

  return `https://${process.env.R2_BUCKET_NAME}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${encodeURIComponent(fileName)}`;
};

// DOWNLOAD (SIGNED URL)
export const getSignedR2DownloadUrl = async (key, expiresIn = 120) => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(r2Client, command, { expiresIn });
};
