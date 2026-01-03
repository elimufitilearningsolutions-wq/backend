import { poolUsers } from "../db.js";
import { uploadToR2, getSignedR2DownloadUrl } from "../utils/r2Helpers.js";
import crypto from "crypto";
import path from "path";



export const createApplicant = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      applicationType,
      startDate,
      employmentStatus
    } = req.body;

    let resumeKey = null;
    let resumeSize = null;
    let resumeType = null;

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const fileName = `resumes/${crypto.randomUUID()}${ext}`;

      await uploadToR2(
        fileName,
        req.file.buffer,
        req.file.mimetype
      );

      resumeKey = fileName;
      resumeSize = req.file.size;       // bytes
      resumeType = req.file.mimetype;   // MIME type
    }

    const insertApplicantSql = `
      INSERT INTO applicants
      (
        firstName, lastName, email, phone,
        applicationType, startDate, employmentStatus,
        resumeKey, resumeSize, resumeType
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await poolUsers.query(insertApplicantSql, [
      firstName,
      lastName,
      email,
      phone,
      applicationType,
      startDate,
      employmentStatus,
      resumeKey,
      resumeSize,
      resumeType
    ]);

    res.status(201).json({
      message: "Applicant created successfully",
      applicantId: result.insertId
    });

  } catch (error) {
    console.error("Error creating applicant:", error);
    res.status(500).json({ message: "An error occurred while creating the applicant" });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const [rows] = await poolUsers.query(`
      SELECT
        id,
        firstName,
        lastName,
        email,
        phone,
        applicationType,
        startDate,
        employmentStatus,
        resumeKey,
        resumeSize,
        resumeType,
        createdAt
      FROM applicants
      ORDER BY createdAt DESC
    `);

    const applicants = rows.map(a => ({
      id: a.id,
      firstName: a.firstName,
      lastName: a.lastName,
      email: a.email,
      phone: a.phone,
      applicationType: a.applicationType,
      startDate: a.startDate,
      employmentStatus: a.employmentStatus,
      resume: {
        exists: !!a.resumeKey,
        size: a.resumeSize,
        type: a.resumeType,
        uploadedAt: a.createdAt
      }
    }));

    res.json(applicants);

  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};




export const downloadResume = async (req, res) => {
  try {
    const applicantId = req.params.id;

    // 1️⃣ Fetch the resumeKey from DB
    const [rows] = await poolUsers.query(
      "SELECT resumeKey FROM applicants WHERE id = ?",
      [applicantId]
    );

    if (!rows.length || !rows[0].resumeKey) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const resumeKey = rows[0].resumeKey;

    // 2️⃣ Generate a signed URL (expires in 2 minutes)
    const signedUrl = await getSignedR2DownloadUrl(resumeKey, 120);

    // 3️⃣ Return URL to frontend
    res.json({ url: signedUrl });

  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ message: "Failed to generate download link" });
  }
};