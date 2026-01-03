import express from "express";
import upload from "../middlewares/upload.js";
import { 
    deleteSecondarySchemeByID, 
    deleteSecondaryFullSetExaminationByID, 
    deleteSecondaryHolidayRevisionsByID,
    deleteSecondaryPastPapersByID,  
    deleteKCSETrialExaminationsByID,
    deleteSecondaryNotesByID,
    
    getKcseTrialExaminations, 
    getSecondaryFullSetExaminations, 
    getSecondaryHolidayRevisions,
    getSecondaryPastPapers,    
    getSecondarySchemes, 

    getSecondarySchemesByYear,
    getFullSetExaminationsByYear, 
    getSecondaryHolidayRevisionsByYear, 
    getSecondaryKCSEPastPapersByYear, 
    getSecondaryKCSEtrialsByYear, 
    getSecondaryNotesByYear, 
    getSecondaryNotes,   

    getSecondarySchemeFileByID, 
    getFullSetExaminationsFileByID,
    getSecondaryHolidayRevisionsFileByID,
    getSecondaryKCSEPastPapersFileByID,
    getSecondaryNotesFileByID,
    getSecondaryKCSEtrialsFileByID
    
} from "../controllers/secondary.js";
import { protectedEndpoint } from "../controllers/auth.js";
import {createResourceHandler} from "../controllers/resource.js"

const secRouter = express.Router(); // Use Router() to create an isolated router instance

// Routes for creating resources with file upload
secRouter.post("/create/schemes", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_secondary';
    req.body.table = 'schemes';
    next();
}, createResourceHandler);
secRouter.post("/create/kcse/past/papers", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_secondary';
    req.body.table = 'ksce_past_papers';
    next();
}, createResourceHandler);
secRouter.post("/create/kcse/trial/examinations", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_secondary';
    req.body.table = 'trial_examinations';
    next();
}, createResourceHandler);
secRouter.post("/create/fullset/examinations", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_secondary';
    req.body.table = 'fullset_examinations';
    next();
}, createResourceHandler);
secRouter.post("/create/revision/notes", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_secondary';
    req.body.table = 'revision_notes';
    next();
}, createResourceHandler);
secRouter.post("/create/holiday/revision", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_secondary';
    req.body.table = 'holiday_revisions';
    next();
}, createResourceHandler);
secRouter.post("/create/holiday/assignments", upload.array("files"), (req, res, next) => {
    req.body.schema = 'elimufi1_secondary';
    req.body.table = 'holiday_assignments';
    next();
}, createResourceHandler);



// Routes for retrieving resources
secRouter.get('/schemes', getSecondarySchemes);
secRouter.get('/notes', getSecondaryNotes); // Corrected this route to getSecondaryNotesByYear
secRouter.get('/kcse/trial/examinations', getKcseTrialExaminations);
secRouter.get('/fullSet/examinations', getSecondaryFullSetExaminations);
secRouter.get('/kcse/past/papers', getSecondaryPastPapers);
secRouter.get('/holiday/revisions', getSecondaryHolidayRevisions);

// Routes for retrieving resources by year
secRouter.get("/fullset/examinations/:year", getFullSetExaminationsByYear);
secRouter.get("/kcse/trial/examinations/:year", getSecondaryKCSEtrialsByYear);
secRouter.get("/notes/:year", getSecondaryNotesByYear);
secRouter.get("/schemes/:year", getSecondarySchemesByYear);
secRouter.get("/kcse/past/papers/:year", getSecondaryKCSEPastPapersByYear);
secRouter.get("/holiday/revisions/:year", getSecondaryHolidayRevisionsByYear);



// Route for retrieving a specific scheme file by ID with protection
secRouter.get("/scheme/file/:id", protectedEndpoint, getSecondarySchemeFileByID);
secRouter.get("/kcse/trial/examination/file/:id", protectedEndpoint, getSecondaryKCSEtrialsFileByID);
secRouter.get("/holiday/revision/file/:id", protectedEndpoint, getSecondaryHolidayRevisionsFileByID);
secRouter.get("/kcse/past/paper/file/:id", protectedEndpoint, getSecondaryKCSEPastPapersFileByID);
secRouter.get("/note/file/:id", protectedEndpoint, getSecondaryNotesFileByID);
secRouter.get("/fullset/examination/file/:id", protectedEndpoint, getFullSetExaminationsFileByID);

// Route for deleting a scheme by ID
secRouter.delete('/schemes/:id', deleteSecondarySchemeByID);
secRouter.get("/kcse/trial/examinations/:id", deleteKCSETrialExaminationsByID);
secRouter.get("/holiday/revisions/:id", deleteSecondaryHolidayRevisionsByID);
secRouter.get("/kcse/past/papers/:id", deleteSecondaryPastPapersByID);
secRouter.get("/notes/:id", deleteSecondaryNotesByID);
secRouter.get("/fullset/examinations/:id", deleteSecondaryFullSetExaminationByID);

export { secRouter };
