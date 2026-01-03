import express from "express";
import upload from "../middlewares/upload.js";
import { createApplicant, downloadResume, getApplicants } from "../controllers/applicants.js";

const applicantsRouter = express.Router();

// Create applicant with optional resume upload
applicantsRouter.post(
  "/",
  upload.single("resume"),
  createApplicant
);

// List applicants (frontend)
applicantsRouter.get("/", getApplicants);


applicantsRouter.get("/:id/resume", downloadResume);

export { applicantsRouter };
