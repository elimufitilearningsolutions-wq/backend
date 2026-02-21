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
        getJssSchemesByYear,
        getJssLessonPlans,
        getJssLessonPlansByYear,
        getJssLessonPlanFileByID,
        getGrade9ExaminationsByYear,
        getGrade9ExaminationFileByID} from "../controllers/jss.js"
import upload from "../middlewares/upload.js"
import { protectedEndpoint } from "../controllers/auth.js"
import { createResourceHandler, deleteResourcesBulkHandler } from "../controllers/resource.js"



const jssRouter = express.Router()

jssRouter.post("/create/schemes", upload.any("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'schemes';
        next();
    }, createResourceHandler);
jssRouter.post("/create/lesson/plans", upload.any("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'lesson_plans';
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
jssRouter.post("/create/grade9/examinations", upload.array("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'grade9_examinations';
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

jssRouter.post("/create/lesson/plans", upload.array("files"), (req, res, next) => {
        req.body.schema = 'elimufi1_jss';
        req.body.table = 'lesson_plan';
        next();
    }, createResourceHandler);









//GET ALL
jssRouter.get   ("/schemes",  getJssSchemes) 
jssRouter.get   ("/lesson/plans",  getJssLessonPlans) 
jssRouter.get   ("/notes",  getJssNotes) 
jssRouter.get   ("/assessment/tools", getJssAssessmentTools)
jssRouter.get   ("/curriculum/designs", getJssCurriculumdesign)

jssRouter.get   ("/grade8/examinations", getGrade8Examinations)
jssRouter.get   ("/fullset/examinations", getJssfullSetExaminations)
jssRouter.get   ("/holiday/assignments", getJssHolidayAssignments)

//GET BY YEAR
jssRouter.get   ("/assessment/tools/:year", getJssAssessmentToolsByYear)
jssRouter.get   ("/lesson/plans/:year", getJssLessonPlansByYear)
jssRouter.get   ("/grade7/examinations/:year", getGrade7ExaminationsByYear)
jssRouter.get   ("/grade8/examinations/:year", getGrade8ExaminationsByYear)
jssRouter.get   ("/grade9/examinations/:year", getGrade9ExaminationsByYear)
jssRouter.get   ("/notes/:year", getJssNotesByYear)
jssRouter.get   ("/schemes/:year", getJssSchemesByYear)
jssRouter.get   ("/fullset/examinations/:year", getJssfullSetExaminationsByYear)
jssRouter.get   ("/curriculum/designs/:year", getJssCurriculumdesignByYear)
jssRouter.get   ("/holiday/assignments/:year", getJssHolidayAssignmentsByYear)

//FILE
jssRouter.get   ("/schemes/file/:id",protectedEndpoint, getJssSchemeFileByID)
jssRouter.get   ("/note/file/:id",protectedEndpoint, getJssNotesFileByID)
jssRouter.get   ("/lesson/plan/file/:id",protectedEndpoint, getJssLessonPlanFileByID)
jssRouter.get   ("/assessment/tool/file/:id",protectedEndpoint, getJssAssesmentToolsFileByID)
jssRouter.get   ("/curriculum/design/file/:id", protectedEndpoint, getJssCurriculumdesignFileByID)
jssRouter.get   ("/grade7/examination/file/:id", protectedEndpoint, getGrade7ExaminationFileByID)
jssRouter.get   ("/grade8/examination/file/:id", protectedEndpoint, getGrade8ExaminationFileByID)
jssRouter.get   ("/grade9/examination/file/:id", protectedEndpoint, getGrade9ExaminationFileByID)
jssRouter.get   ("/fullset/examination/file/:id", protectedEndpoint,  getJssfullSetExaminationFileByID)

jssRouter.get   ("/holiday/assignment/file/:id", protectedEndpoint, getJssHassignmentsFileByID)


//DELETE

jssRouter.post("/schemes/bulk", deleteResourcesBulkHandler);
jssRouter.post("/notes/bulk", deleteResourcesBulkHandler)
jssRouter.post ("/assessment/tools/bulk", deleteResourcesBulkHandler)
jssRouter.post("/curriculum/designs/bulk", deleteResourcesBulkHandler)
jssRouter.post("/grade7/examinations/bulk", deleteResourcesBulkHandler)
jssRouter.post("/grade8/examinations/bulk",deleteResourcesBulkHandler)
jssRouter.post("/fullset/exams/bulk", deleteResourcesBulkHandler)
jssRouter.post("/holiday/assignments/bulk", deleteResourcesBulkHandler)







jssRouter.put("/update/schemes/:id",updateJssSchemeByID),
jssRouter.put("/update/assessment/tools/:id", updateJssAssesmentToolsByID)
jssRouter.put("/update/curriculum/designs/:id",updateJssCurriculumdesignByID)
jssRouter.put("/update/grade7/exams/:id", updateGrade7ExaminationByID)
jssRouter.put("/update/grade8/exams/:id",updateGrade8ExaminationByID)
jssRouter.put("/update/fullset/exams/:id", updateJssfullSetExaminationByID)

jssRouter.put("/update/holiday/assignments/:id", updateJssHassignmentsByID)


export {jssRouter}