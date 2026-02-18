import express from "express"
import upload from "../middlewares/upload.js";
import { protectedEndpoint } from "../controllers/auth.js";
import { createResourceHandler, } from "../controllers/resource.js";
import { getGrade10EvaluationsByYear, getGrade10Exams, 
    getGrade10ExamsByYear, 
    getGrade10ExamsFileByID, 
    getSeniorSchoolCurriculumDesign, 
    getSeniorSchoolCurriculumDesignByYear, 
    getSeniorSchoolCurriculumDesignFileByID, 
    getSeniorSchoolLessonPlanByYear, 
    getSeniorSchoolLessonPlanFileByID, 
    getSeniorSchoolRevisionNotes, 
    getSeniorSchoolRevisionNotesFileByID, 
    getSeniorSchoolSchemes, 
    getSeniorSchoolSchemesByYear, 
    getSeniorSchoolSchemesFileByID } from "../controllers/seniorSchool.js";


const seniorSchoolRouter = express.Router()



seniorSchoolRouter.post("/create/grade10/exams", upload.any("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_senior';
        req.body.table = 'grade10_exams';
        next();
    }, createResourceHandler);
seniorSchoolRouter.post("/create/grade10/evaluations", upload.any("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_senior';
        req.body.table = 'grade10_evaluations';
        next();
    }, createResourceHandler);
seniorSchoolRouter.post("/create/lesson/plans", upload.any("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_senior';
        req.body.table = 'lesson_plans';
        next();
    }, createResourceHandler);


seniorSchoolRouter.post("/create/curriculum/designs", upload.any("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_senior';
        req.body.table = 'curriculum_designs';
        next();
    }, createResourceHandler);
seniorSchoolRouter.post("/create/notes", upload.any("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_senior';
        req.body.table = 'notes';
        next();
    }, createResourceHandler);
seniorSchoolRouter.post("/create/schemes", upload.any("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_senior';
        req.body.table = 'schemes';
        next();
    }, createResourceHandler);



    //get all
     seniorSchoolRouter.get('/schemes', getSeniorSchoolSchemes)
     seniorSchoolRouter.get('/notes', getSeniorSchoolRevisionNotes)
     
  
     seniorSchoolRouter.get('/curriculum/designs', getSeniorSchoolCurriculumDesign)
     

    
     //get per year
    
     seniorSchoolRouter.get("/schemes/:year", getSeniorSchoolSchemesByYear);
     seniorSchoolRouter.get("/notes/:year", getSeniorSchoolRevisionNotes);
     seniorSchoolRouter.get("/lesson/plans/:year", getSeniorSchoolLessonPlanByYear);
  
     seniorSchoolRouter.get("/curriculum/designs/:year", getSeniorSchoolCurriculumDesignByYear);
     seniorSchoolRouter.get("/grade10/evaluations/:year", getGrade10EvaluationsByYear);
     seniorSchoolRouter.get("/grade10/examinations/:year", getGrade10ExamsByYear);
 
    
    
     seniorSchoolRouter.get("/scheme/file/:id",protectedEndpoint,getSeniorSchoolSchemesFileByID)
     seniorSchoolRouter.get("/lesson/plan/file/:id",protectedEndpoint,getSeniorSchoolLessonPlanFileByID)
     seniorSchoolRouter.get("/revision/note/file/:id",protectedEndpoint,getSeniorSchoolRevisionNotesFileByID)
    
     seniorSchoolRouter.get("/curriculum/design/file/:id",protectedEndpoint,getSeniorSchoolCurriculumDesignFileByID)
     seniorSchoolRouter.get("/grade10/examination/file/:id",protectedEndpoint,getGrade10ExamsFileByID)
     {/*
     seniorSchoolRouter.delete("/schemes/:id", deletePrimarySchemesByID)
     seniorSchoolRouter.delete("/notes/file/:id", deletePrimaryRevisionNotesByID)
   
     seniorSchoolRouter.delete("/curriculum/designs/:id", deletePrimaryCurriculumDesignByID)
     seniorSchoolRouter.delete("/grade10/examinations/:id", deleteGrade1ExamsByID)
  
     
     seniorSchoolRouter.put("/schemes/:id", updatePrimarySchemeByID)
     seniorSchoolRouter.put("/notes/file/:id", updatePrimaryRevisionNotesByID)
    
     seniorSchoolRouter.put("/curriculum/designs/:id", updatePrimaryCurriculumDesignByID)
     seniorSchoolRouter.put("/grade10/examinations/:id", updateGrade1ExamsByID)*/}
    
     
export {seniorSchoolRouter}