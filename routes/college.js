import express from "express";
import upload from "../middlewares/upload.js";
import { protectedEndpoint } from "../controllers/auth.js";
import { createResourceHandler } from "../controllers/resource.js";
import { CPANotes, 
        DiplomaNotes, 
        ECDNotes, 
        getCPANotesByYear, 
        getCPANotesFileByID, 
        getDiplomaNotesFileByID, 
        getDiplomayYear, 
        getDPTENotes, 
        getDPTENotesByYear, 
        getDPTENotesFileByID, 
        getECDByYear, 
        getecdNotesFileByID } 
        from "../controllers/college.js";

const collegeRouter = express.Router();



collegeRouter.post(
  "/create/dptenotes",  
  upload.array("files"),
  (req, res, next) => {
    req.body.schema = "elimufi1_college";
    req.body.table = "dptenotes";
    next();
  },
  createResourceHandler
);

collegeRouter.post(
  "/create/cpanotes",  
  upload.array("files"),
  (req, res, next) => {
    req.body.schema = "elimufi1_college";
    req.body.table = "cpanotes";
    next();
  },
  createResourceHandler
);

collegeRouter.post(
  "/create/ecdnotes",  
  upload.array("files"),
  (req, res, next) => {
    req.body.schema = "elimufi1_college";
    req.body.table = "ecdnotes";
    next();
  },
  createResourceHandler
);

collegeRouter.post(
  "/create/diplomanotes",  
  upload.array("files"),
  (req, res, next) => {
    req.body.schema = "elimufi1_college";
    req.body.table = "diplomanotes";
    next();
  },
  createResourceHandler
);


//GET ALL
collegeRouter.get   ("/dpte/notes",  getDPTENotes) 
collegeRouter.get   ("/cpa/notes",  CPANotes) 
collegeRouter.get   ("/ecd/notes",  ECDNotes) 
collegeRouter.get   ("/diploma/notes",  DiplomaNotes) 

//GET BY YEAR
collegeRouter.get   ("/dpte/notes/:year", getDPTENotesByYear)
collegeRouter.get   ("/cpa/notes/:year", getCPANotesByYear)
collegeRouter.get   ("/ecd/notes/:year", getECDByYear)
collegeRouter.get   ("/diploma/notes/:year", getDiplomayYear)

//FILE
collegeRouter.get   ("/dpte/note/file/:id",     getDPTENotesFileByID)
collegeRouter.get   ("/cpa/note/file/:id",     protectedEndpoint, getCPANotesFileByID)
collegeRouter.get   ("/ecd/note/file/:id",     protectedEndpoint, getecdNotesFileByID)
collegeRouter.get   ("/diploma/note/file/:id", protectedEndpoint, getDiplomaNotesFileByID)

export { collegeRouter };

