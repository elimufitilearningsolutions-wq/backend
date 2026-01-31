import { validationResult } from "express-validator";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { uploadToR2 } from "../utils/r2Helpers.js";
import { DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import r2Client from "../utils/r2Client.js";
import { getPoolBySchema } from "../dbPools.js";

import {
  handleValidationError,
  handleDatabaseError
} from "./errorHandlers.js";

export const createResource = async (req, res, tableName, pool) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleValidationError(res, errors);
    }

    if (!req.files?.length) {
      return res.status(400).json({ error: "File data is missing or invalid." });
    }

    const { form, term, subject, year, examMS, set, grade } = req.body;

    const insertSql = `
      INSERT INTO ${tableName}
      (form, term, subject, file_url, year, fileName, fileExtension, examMS, \`set\`, grade)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await Promise.all(
      req.files.map(async ({ buffer, originalname, mimetype }) => {
        const fileExtension = originalname.split(".").pop();

        console.log("📤 Uploading:", originalname);

        const fileUrl = await uploadToR2(originalname, buffer, mimetype);
        console.log("☁️ R2 OK:", fileUrl);

        await pool.query(insertSql, [
          form,
          term,
          subject,
          fileUrl,
          year,
          originalname,
          fileExtension,
          examMS,
          set,
          grade
        ]);

        console.log("✅ DB insert:", originalname);
      })
    );

    return res.status(201).json({ message: "All files successfully saved." });
  } catch (error) {
    console.error("❌ createResource error:", error);
    return res.status(500).json({
      errorMessage: error.message
    });
  }
};


export const createResourceHandler = async (req, res) => {
  try {
    const { schema, table } = req.body;

    if (!schema || !table) {
      return res.status(400).json({ error: "Schema and table are required." });
    }

    const pool = getPoolBySchema(schema);

    // 🔒 Safety check (keep this)
    const [[{ db }]] = await pool.query("SELECT DATABASE() AS db");
    console.log("🔥 INSERT DB:", db);
    console.log("📌 INSERT TABLE:", table);

    return createResource(req, res, table, pool);
  } catch (error) {
    console.error("❌ createResourceHandler error:", error);
    return res.status(500).json({
      errorMessage: error.message
    });
  }
};







export const getResources = async (req, res, tableName, schema) => {
    try {
        const sql = `SELECT id, form, term, subject, examMS, year, fileExtension, fileName, \`set\`, grade FROM ${tableName}`;
        const pool = getPoolBySchema(schema);
        const result = await pool.query(sql);

        if (result.length === 0) {
            return res.status(404).json({ error: `No resources found in ${tableName}.` });
        }

        return res.status(200).json(result[0]);
    } catch (error) {
        console.error(`Error fetching resources from ${tableName} in database:${pool}`, error);
        return handleDatabaseError(res, error);
    }
};

export const getResourcesHandler = async (req, res) => {
    try {
        const schema = req.body.schema;
        const table = req.body.table;
        const pool = getPoolBySchema(schema);

        return getResources(req, res, `${schema}.${table}`, schema);
    } catch (error) {
        console.error(`Error fetching ${table}:`, error);
        return res.status(500).send({ error: "Internal server error" });
    }
};

export const getResourcesByYear = async (req, res, tableName, schema) => {
    const year = req.params.year;

    try {
        const sql = `SELECT id, form,  subject, examMS, year,  \`set\`, grade, fileExtension, fileName  FROM ${tableName} WHERE year = ?`;
        const pool = getPoolBySchema(schema);
        const results = await pool.query(sql, [year]);

        if (results.length === 0) {
            return res.status(404).json({ error: `No resources found for year ${year} in ${tableName}.` });
        }

        return res.status(200).json(results[0]);
    } catch (error) {
        console.error(`Error fetching resources from ${tableName} for year ${year} in database:`, error);
        return handleDatabaseError(res, error);
    }
};

export const getResourcesByYearHandler = async (req, res) => {
    try {
        const schema = req.body.schema;
        const table = req.body.table;
        const year = req.params.year;
        const pool = getPoolBySchema(schema);

        return getResourcesByYear(req, res, `${schema}.${table}`, schema);

    } catch (error) {
        console.error(`Error fetching resources by year ${table}:`, error);
        return res.status(500).send({ error: "Internal server error" });
    }
};

export const getResourcesByForm = async (req, res, tableName, pool) => {
    const form = req.params.form;

    try {
        const sql = `SELECT id, form,  subject, examMS, year, fileExtension, fileName, \`set\`, grade FROM ${tableName} WHERE form = ?`;
        const [results] = await pool.query(sql, [form]);

        if (results.length === 0) {
            return res.status(404).json({ error: `No resources found for form ${form} in ${tableName}.` });
        }

        return res.status(200).json(results[0]);
    } catch (error) {
        console.error(`Error fetching resources from ${tableName} for form ${form} in database:`, error);
        return handleDatabaseError(res, error);
    }
};

export const getResourcesByFormHandler = async (req, res) => {
    try {
        const schema = req.body.schema;
        const table = req.body.table;
        const form = req.params.form;
        const pool = getPoolBySchema(schema);

        return getResourcesByForm(req, res, `${schema}.${table}`, pool);
    } catch (error) {
        console.error(`Error fetching resources by form ${table}:`, error);
        return res.status(500).send({ error: "Internal server error" });
    }
};


export const getFileByID = async (req, res, tableName, schema) => {
  try {
    const sql = `
      SELECT file_url
      FROM ${tableName}
      WHERE id = ?
    `;

    const id = req.params.id;
    const pool = getPoolBySchema(schema);
    const [rows] = await pool.query(sql, [id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Resource not found." });
    }

    const { file_url } = rows[0];

    if (!file_url) {
      return res.status(404).json({ error: "File URL missing." });
    }

    // 🔹 Extract R2 object key safely
    // Works for:
    // https://bucket.account.r2.cloudflarestorage.com/path/file.pdf
    const url = new URL(file_url);
    const fileKey = decodeURIComponent(url.pathname.slice(1));

    // 🔹 Fetch object from R2
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
    });

    const r2Response = await r2Client.send(command);

    // 🔹 Set headers
    res.setHeader(
      "Content-Type",
      r2Response.ContentType || "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileKey.split("/").pop()}"`
    );

    // 🔹 Stream file to client
    r2Response.Body.pipe(res);

  } catch (error) {
    console.error("Error streaming file from R2:", error);
    return handleDatabaseError(res, error);
  }
};

export const deleteResourcesBulk = async (req, res, tableName, schema) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "IDs array is required." });
  }

  try {
    const pool = getPoolBySchema(schema);

    // 1️⃣ Fetch matching resources from DB
    const [rows] = await pool.query(
      `SELECT id, file_url FROM ${tableName} WHERE id IN (?)`,
      [ids]
    );

    if (!rows || rows.length === 0) {
      return res.status(200).json({
        message: "No matching resources found.",
        deletedDbRows: 0,
        deletedFiles: 0,
        deletedKeys: [],
      });
    }

    // 2️⃣ Delete files from R2 in parallel
    const deletedKeys = await Promise.all(
      rows.map(async ({ file_url }) => {
        if (!file_url) return null;

        const fileKey = decodeURIComponent(new URL(file_url).pathname.slice(1));

        try {
          await r2Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.R2_BUCKET_NAME,
              Key: fileKey,
            })
          );

          // Optionally verify deletion
          try {
            await r2Client.send(
              new HeadObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: fileKey,
              })
            );
            console.warn(`⚠️ R2 file still exists after delete: ${fileKey}`);
            return null;
          } catch {
            console.log("✅ Deleted from R2:", fileKey);
            return fileKey;
          }
        } catch (err) {
          console.error("R2 delete error:", fileKey, err);
          return null;
        }
      })
    );

    const validDeletedKeys = deletedKeys.filter(Boolean);

    // 3️⃣ Delete DB rows
    const [result] = await pool.query(
      `DELETE FROM ${tableName} WHERE id IN (?)`,
      [ids]
    );

    return res.status(200).json({
      message: "Bulk delete completed successfully.",
      deletedDbRows: result.affectedRows,
      deletedFiles: validDeletedKeys.length,
      deletedKeys: validDeletedKeys,
    });
  } catch (error) {
    console.error("deleteResourcesBulk error:", error);
    return handleDatabaseError(res, error);
  }
};

export const deleteResourcesBulkHandler = async (req, res) => {
  try {
    const { schema, table } = req.body;

    if (!schema || !table) {
      return res.status(400).json({ error: "Schema and table are required." });
    }

    // Make tableName safe
    const tableName = `${schema}.${table}`;

    return deleteResourcesBulk(req, res, tableName, schema);
  } catch (error) {
    console.error("deleteResourcesBulkHandler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const getFileByIDHandler = async (req, res) => {
  try {
    const { schema, table } = req.body;

    if (!schema || !table) {
      return res.status(400).json({ error: "Schema and table are required." });
    }

    return getFileByID(req, res, `${schema}.${table}`, schema);
  } catch (error) {
    console.error("Error fetching resource:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const deleteAllResources = async (req, res, tableName, schema) => {
  try {
    const pool = getPoolBySchema(schema);

    // 1️⃣ Fetch file URLs belonging to THIS table only
    const [rows] = await pool.query(
      `SELECT file_url FROM ${tableName} WHERE file_url IS NOT NULL`
    );

    let deletedFiles = 0;

    // 2️⃣ Delete each related file from R2
    for (const { file_url } of rows) {
      const url = new URL(file_url);
      const fileKey = decodeURIComponent(url.pathname.slice(1));

      // Delete from R2
      await r2Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: fileKey,
        })
      );

      // Verify deletion
      try {
        await r2Client.send(
          new HeadObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileKey,
          })
        );

        return res.status(500).json({
          error: "R2 file still exists after delete",
          r2Key: fileKey,
        });
      } catch {
        console.log("✅ Deleted R2:", fileKey);
        deletedFiles++;
      }
    }

    // 3️⃣ Delete only THIS table’s rows
    await pool.query(`DELETE FROM ${tableName}`);

    return res.status(200).json({
      message: "Table resources fully deleted (DB + R2).",
      deletedFiles,
    });
  } catch (error) {
    console.error("deleteAllResources error:", error);
    return handleDatabaseError(res, error);
  }
};


export const deleteAllResourcesHandler = async (req, res) => {
  try {
    const { schema, table } = req.body;

    if (!schema || !table) {
      return res.status(400).json({ error: "Schema and table are required." });
    }

    return deleteAllResources(req, res, `${schema}.${table}`, schema);
  } catch (error) {
    console.error("deleteAllResourcesHandler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const deleteResource = async (req, res, tableName, schema) => {
  const resourceId = req.params.id;

  try {
    const pool = getPoolBySchema(schema);

    // 1) Get resource (need file_url)
    const [rows] = await pool.query(
      `SELECT id, file_url FROM ${tableName} WHERE id = ?`,
      [resourceId]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Resource not found." });
    }

    const { file_url } = rows[0];

    let fileKey = null;
    let r2Deleted = false;
    let r2VerifiedDeleted = false;

    // 2) Delete file from R2
    if (file_url) {
      const url = new URL(file_url);
      fileKey = decodeURIComponent(url.pathname.slice(1));

      const delCmd = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileKey,
      });

      const delRes = await r2Client.send(delCmd);
      console.log("☁️ R2 delete requestId:", delRes?.$metadata?.requestId);

      r2Deleted = true;

      // 3) Verify deletion
      try {
        await r2Client.send(
          new HeadObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileKey,
          })
        );

        // if HeadObject succeeds => still exists
        return res.status(500).json({
          error: "File still exists in R2 after delete.",
          r2Key: fileKey,
        });
      } catch (err) {
        // if NotFound => deleted
        r2VerifiedDeleted = true;
        console.log("✅ Verified deleted from R2:", fileKey);
      }
    }

    // 4) Delete from DB
    const [result] = await pool.query(
      `DELETE FROM ${tableName} WHERE id = ?`,
      [resourceId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Resource not found." });
    }

    return res.status(200).json({
      message: "Resource deleted from DB and Cloudflare R2 successfully.",
      r2Deleted,
      r2VerifiedDeleted,
      r2Key: fileKey,
    });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return handleDatabaseError(res, error);
  }
};


export const deleteResourceHandler = async (req, res) => {
  try {
    const { schema, table } = req.body;

    if (!schema || !table) {
      return res.status(400).json({ error: "Schema and table are required." });
    }

    return deleteResource(req, res, `${schema}.${table}`, schema);
  } catch (error) {
    console.error(`Error deleting resource ${table}:`, error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const updateResourceById = async (req, res, tableName, pool) => {
    try {
        const resourceId = req.params.id;
        const { form, term, subject, year, examMS, set, grade } = req.body;

        const sql = `UPDATE ${tableName} SET form = ?, term = ?, subject = ?, year = ?, examMS = ?, \`set\` = ?, grade = ? WHERE id = ?`;
        const [result] = await pool.query(sql, [form, term, subject, year, examMS, set, grade, resourceId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Resource not found." });
        }

        console.log("Resource successfully updated.");
        return res.status(200).json({ message: "Resource successfully updated." });
    } catch (error) {
        console.error("Error updating resource in database:", error);
        return handleDatabaseError(res, error);
    }
};

export const updateResourceByIdHandler = async (req, res) => {
    try {
        const schema = req.body.schema;
        const table = req.body.table;
        const pool = getPoolBySchema(schema);

        return updateResourceById(req, res, `${schema}.${table}`, pool);
    } catch (error) {
        console.error(`Error updating resource ${table}:`, error);
        return res.status(500).send({ error: "Internal server error" });
    }
};
