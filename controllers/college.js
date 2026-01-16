import { getFileByID, getResources, getResourcesByYear } from "./resource.js";


export const getDPTENotes =async (req, res) => {
    return getResources(req, res, 'dptenotes', "elimufi1_college");
};

export const CPANotes =async (req, res) => {
    return getResources(req, res, 'cpanotes', "elimufi1_college");
};

export const ECDNotes =async (req, res) => {
    return getResources(req, res, 'cpanotes', "elimufi1_college");
};

export const DiplomaNotes =async (req, res) => {
    return getResources(req, res, 'cpanotes', "elimufi1_college");
};


//GET BY YEAR
export const getDPTENotesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'dptenotes', "elimufi1_college");
}

export const getCPANotesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'cpanotes', "elimufi1_college");
}

export const getECDByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'ecdnotes', "elimufi1_college");
}

export const getDiplomayYear = async (req, res) => {
    return getResourcesByYear(req, res, 'diplomanotes', "elimufi1_college");
}



//GET FILE BY ID && DOWNLOADING FILE
export const getDPTENotesFileByID = async (req, res) => {
    return getFileByID(req, res, 'dptenotes', "elimufi1_college");
};
export const getCPANotesFileByID = async (req, res) => {
    return getFileByID(req, res, 'cpanotes', "elimufi1_college");
};
export const getecdNotesFileByID = async (req, res) => {
    return getFileByID(req, res, 'ecdnotes', "elimufi1_college");
};
export const getDiplomaNotesFileByID = async (req, res) => {
    return getFileByID(req, res, 'diplomanotes', "elimufi1_college");
};