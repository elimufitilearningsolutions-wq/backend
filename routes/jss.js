import express from "express"
import {  
        //CREATE
        
        //DELETE
        deleteGrade7Examinations, 
        deleteGrade8Examinations, 
        deleteAllJssCurriculumdesigns, 
        deleteAllJssfullSetExaminations, 
        deleteAllJssHassignments,        
        deleteJssSchemes, 
        deleteJssAssesmentTools, 
        deleteGrade7ExaminationByID, 
        deleteGrade8ExaminationByID, 
        deleteJssCurriculumdesignByID, 
        deleteJssfullSetExaminationByID, 
        deleteJssHassignmentsByID, 
    
        deleteJssSchemeByID,
        deleteJssAssesmentToolsByID,
        //GET ALL
        getGrade7Examinations,
        getJssCurriculumdesign,
        getJssfullSetExaminations,        
        getJssSchemes,
        
        // UPDATE BY ID
        updateGrade7ExaminationByID,
        updateGrade8ExaminationByID,
        updateJssCurriculumdesignByID,
        updateJssfullSetExaminationByID,
        updateJssHassignmentsByID,
       
        updateJssSchemeByID,
        updateJssAssesmentToolsByID,
        //GET BY ID
        getJssSchemeFileByID,
        getJssAssesmentToolsFileByID,
        getJssCurriculumdesignFileByID,
        getGrade7ExaminationFileByID,        
        getJssfullSetExaminationFileByID,
      
        getJssHassignmentsFileByID,
        getGrade8Examinations,        
        getJssAssessmentToolsByYear,
        getJssAssessmentTools,
        getGrade7ExaminationsByYear,
        getJssHolidayAssignments,
       
        getGrade8ExaminationsByYear,
        getJssfullSetExaminationsByYear,
        getJssHolidayAssignmentsByYear,
        getJssCurriculumdesignByYear,
        getGrade8ExaminationFileByID,
        getJssNotes,
        getJssNotesByYear,
        deleteJssNotes,
        getJssNotesFileByID,
        deleteJssNotesByID,
        getJssSchemesByYear} from "../controllers/jss.js"
import upload from "../middlewares/upload.js"
import { protectedEndpoint } from "../controllers/auth.js"
import { createResourceHandler } from "../controllers/resource.js"



const jssRouter = express.Router()

jssRouter.post("/create/schemes", upload.any("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'schemes';
        next();
    }, createResourceHandler);
jssRouter.post("/create/notes", upload.array("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'notes';
        next();
    }, createResourceHandler);

jssRouter.post("/create/assessment/tools", upload.array("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'assessment_tools';
        next();
    }, createResourceHandler);
jssRouter.post("/create/curriculum/designs", upload.array("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'curriculum_designs';
        next();
    }, createResourceHandler);
jssRouter.post("/create/grade7/examinations", upload.array("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'grade7_examinations';
        next();
    }, createResourceHandler);
jssRouter.post("/create/grade8/examinations", upload.array("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'grade8_examinations';
        next();
    }, createResourceHandler);
jssRouter.post("/create/fullset/examinations", upload.array("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'fullset_examinations';
        next();
    }, createResourceHandler);

jssRouter.post("/create/holiday/assignments", upload.array("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'holiday_assignments';
        next();
    }, createResourceHandler);









//GET ALL
jssRouter.get   ("/schemes",  getJssSchemes) 
jssRouter.get   ("/notes",  getJssNotes) 
jssRouter.get   ("/assessment/tools", getJssAssessmentTools)
jssRouter.get   ("/curriculum/designs", getJssCurriculumdesign)
jssRouter.get   ("/grade7/examinations", getGrade7Examinations)
jssRouter.get   ("/grade8/examinations", getGrade8Examinations)
jssRouter.get   ("/fullset/examinations", getJssfullSetExaminations)
jssRouter.get   ("/holiday/assignments", getJssHolidayAssignments)

//GET BY YEAR
jssRouter.get   ("/assessment/tools/:year", getJssAssessmentToolsByYear)
jssRouter.get   ("/grade7/examinations/:year", getGrade7ExaminationsByYear)
jssRouter.get   ("/grade8/examinations/:year", getGrade8ExaminationsByYear)
jssRouter.get   ("/notes/:year", getJssNotesByYear)
jssRouter.get   ("/schemes/:year", getJssSchemesByYear)
jssRouter.get   ("/fullset/examinations/:year", getJssfullSetExaminationsByYear)
jssRouter.get   ("/curriculum/designs/:year", getJssCurriculumdesignByYear)
jssRouter.get   ("/holiday/assignments/:year", getJssHolidayAssignmentsByYear)

//FILE
jssRouter.get   ("/schemes/file/:id",protectedEndpoint, getJssSchemeFileByID)
jssRouter.get   ("/note/file/:id",protectedEndpoint, getJssNotesFileByID)
jssRouter.get   ("/assessment/tool/file/:id",protectedEndpoint, getJssAssesmentToolsFileByID)
jssRouter.get   ("/curriculum/design/file/:id", protectedEndpoint, getJssCurriculumdesignFileByID)
jssRouter.get   ("/grade7/examination/file/:id", protectedEndpoint, getGrade7ExaminationFileByID)
jssRouter.get   ("/grade8/examination/file/:id", protectedEndpoint, getGrade8ExaminationFileByID)
jssRouter.get   ("/fullset/examination/file/:id", protectedEndpoint,  getJssfullSetExaminationFileByID)

jssRouter.get   ("/holiday/assignment/file/:id", protectedEndpoint, getJssHassignmentsFileByID)

jssRouter.delete("/delete/schemes", deleteJssSchemes)
jssRouter.delete("/delete/notes", deleteJssNotes)
jssRouter.delete ("/delete/assessment/tools", deleteJssAssesmentTools)
jssRouter.delete("/delete/curriculum/designs", deleteAllJssCurriculumdesigns)
jssRouter.delete("/delete/grade7/exams", deleteGrade7Examinations)
jssRouter.delete("/delete/grade8/examinations",deleteGrade8Examinations)
jssRouter.delete("/delete/fullset/exams", deleteAllJssfullSetExaminations)

jssRouter.delete("/delete/holiday/assignments", deleteAllJssHassignments)

jssRouter.delete("/delete/schemes/:id",deleteJssSchemeByID)
jssRouter.delete("/delete/notes/:id",deleteJssNotesByID)
jssRouter.delete ("/delete/assessment/tools/:id", deleteJssAssesmentToolsByID)
jssRouter.delete("/delete/curriculum/designs/:id", deleteJssCurriculumdesignByID)
jssRouter.delete("/delete/grade7/exams/:id", deleteGrade7ExaminationByID)
jssRouter.delete("/delete/grade8/examinations/:id",deleteGrade8ExaminationByID)
jssRouter.delete("/delete/fullset/exams/:id", deleteJssfullSetExaminationByID)

jssRouter.delete("/delete/holiday/assignments/:id", deleteJssHassignmentsByID)

jssRouter.put("/update/schemes/:id",updateJssSchemeByID),
jssRouter.put("/update/assessment/tools/:id", updateJssAssesmentToolsByID)
jssRouter.put("/update/curriculum/designs/:id",updateJssCurriculumdesignByID)
jssRouter.put("/update/grade7/exams/:id", updateGrade7ExaminationByID)
jssRouter.put("/update/grade8/exams/:id",updateGrade8ExaminationByID)
jssRouter.put("/update/fullset/exams/:id", updateJssfullSetExaminationByID)

jssRouter.put("/update/holiday/assignments/:id", updateJssHassignmentsByID)


export {jssRouter}