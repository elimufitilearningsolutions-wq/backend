import express from "express"
import upload from "../middlewares/upload.js"
import { /*createScheme, */
    getPriPrimarySchemes, 
    deletePriPrimarySchemeByID, 
    updatePriPrimarySchemeByID,
    getPriPrimarySchemeFileByID,   
    getPlayGroupExams,
    getPlayGroupExamByID,
    updatePlayGroupExamByID,
    deletePlayGroupExamByID,
    getPlayGroupExamsByYear,    
    getPP1Exams,
    getPPE1ExamsByYear,
    deletePP1ExamByID,
    getPP1ExamByID,
    getPP2Exams,
    getPPE2ExamsByYear,
    getPP2ExamByID,
    deletePP2ExamByID,    
    getPriPrimaryHolidayAssignments,    
    getPrePrimaryRevisionFileByID,   
    getPrePrimarySchemesByYear,
    getPriPrimaryCurriculumDesign,
    getPriPrimaryCurriculumDesignByYear,
    getPriPrimaryHolidayAssignmentsByYear,
    getPrePriPrimaryHolidayAssignmentFileByID,
    deletePriPrimaryHolidayAssignmentsByID,
    getPriPrimaryCurriculumDesignFileByID,
    deletePriPrimaryCurriculumDesignByID,
    deleteAllPrePrimaryCurriculuDesigns,
    getPlayGroupColouringByYear,
    deleteAllPrePrimarySchemes,
    getPriPrimaryLessonPlanByYear,
    getPriPrimaryLessonPlanFileByID,
    getPriPrimaryTeachingAidsByYear,
    getPriPrimaryTeachingAidFileByID
   
} from "../controllers/pre_primary.js"
import { protectedEndpoint } from "../controllers/auth.js"
import {createResourceHandler, deleteResourcesBulkHandler} from "../controllers/resource.js"


const prePriRouter = express.Router()
//POST
prePriRouter.post("/create/schemes", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_preprimary';
    req.body.table = 'schemes';
    next();
}, createResourceHandler);
prePriRouter.post("/create/teaching/aids", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_preprimary';
    req.body.table = 'teaching_aids';
    next();
}, createResourceHandler);

prePriRouter.post("/create/lesson/plans", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_preprimary';
    req.body.table = 'lesson_plans';
    next();
}, createResourceHandler);


prePriRouter.post("/create/coluring/pages", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_preprimary';
    req.body.table = 'colouring_pages';
    next();
}, createResourceHandler);


prePriRouter.post("/create/curriculum/designs", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_preprimary';
    req.body.table = 'curriculum_designs';
    next();
}, createResourceHandler);

prePriRouter.post("/create/play/group/exams", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_preprimary';
    req.body.table = 'playgroup_exams';
    next();
}, createResourceHandler);
prePriRouter.post("/create/pp1/exams", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_preprimary';
    req.body.table = 'pp1_exams';
    next();
}, createResourceHandler);
prePriRouter.post("/create/pp2/exams", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_preprimary';
    req.body.table = 'pp2_exams';
    next();
}, createResourceHandler);
prePriRouter.post("/create/holiday/assignments", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_preprimary';
    req.body.table = 'holiday_assignments';
    next();
}, createResourceHandler);

//GET ALL
prePriRouter.get("/schemes", getPriPrimarySchemes)
prePriRouter.get("/play/group/exams", getPlayGroupExams)

prePriRouter.get("/pp1/exams", getPP1Exams)
prePriRouter.get("/pp2/exams", getPP2Exams)
prePriRouter.get("/holiday/assignments", getPriPrimaryHolidayAssignments)
prePriRouter.get("/curriculum/designs", getPriPrimaryCurriculumDesign)

prePriRouter.get("/play/group/exams/:year", getPlayGroupExamsByYear)
prePriRouter.get("/teaching/aids/:year", getPriPrimaryTeachingAidsByYear)
prePriRouter.get("/lesson/plans/:year", getPriPrimaryLessonPlanByYear)

prePriRouter.get("/play/group/colouring/:year", getPlayGroupColouringByYear)
prePriRouter.get("/schemes/:year", getPrePrimarySchemesByYear)
prePriRouter.get("/PP1/exams/:year", getPPE1ExamsByYear)
prePriRouter.get("/PP2/exams/:year", getPPE2ExamsByYear)
prePriRouter.get("/holiday/assignments/:year", getPriPrimaryHolidayAssignmentsByYear)
prePriRouter.get("/curriculum/designs/:year", getPriPrimaryCurriculumDesignByYear)
///pre/primary/play/group/exams

//GET FILE BY ID/download
prePriRouter.get("/scheme/file/:id", protectedEndpoint, getPriPrimarySchemeFileByID)
prePriRouter.get("/teaching/aid/file/:id", protectedEndpoint, getPriPrimaryTeachingAidFileByID)
prePriRouter.get("/lesson/plan/file/:id", protectedEndpoint, getPriPrimaryLessonPlanFileByID)

prePriRouter.get("/play/group/exam/file/:id", protectedEndpoint, getPlayGroupExamByID)
prePriRouter.get("/play/group/colourin/file/:id",  getPlayGroupExamByID)
prePriRouter.get("/pp1/exam/file/:id", protectedEndpoint, getPP1ExamByID)
prePriRouter.get("/pp2/exam/file/:id", protectedEndpoint, getPP2ExamByID)
prePriRouter.get("/pre/primary/holiday/revision/file/:id", protectedEndpoint, getPrePrimaryRevisionFileByID)
prePriRouter.get("/holiday/assignment/file/:id", protectedEndpoint, getPrePriPrimaryHolidayAssignmentFileByID)
prePriRouter.get("/curriculum/design/file/:id", protectedEndpoint, getPriPrimaryCurriculumDesignFileByID)

//UPDATE BY ID
prePriRouter.put("/update/schemes/:id",updatePriPrimarySchemeByID)
prePriRouter.put("/update/play/group/exam/:id",updatePlayGroupExamByID)
prePriRouter.put("/update/play/group/exam/:id",updatePlayGroupExamByID)

// DELETE BY ID
prePriRouter.post('/play/group/exams/bulk', deleteResourcesBulkHandler)
prePriRouter.post("/schemes/bulk", deleteResourcesBulkHandler)
prePriRouter.post('/pp1/exams/bulk', deleteResourcesBulkHandler)
prePriRouter.delete('/pp2/exams/:id', deleteResourcesBulkHandler)
prePriRouter.post('/holiday/assignments/:id', deleteResourcesBulkHandler)
prePriRouter.post('/curriculum/designs/bulk', deleteResourcesBulkHandler)
prePriRouter.post('/teaching/aids/bulk', deleteResourcesBulkHandler)
prePriRouter.post('/lesson/plans/bulk', deleteResourcesBulkHandler)



export {prePriRouter}