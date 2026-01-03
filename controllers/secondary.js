import { createResource, 
    getResources, 
    getResourcesByYear, 
    updateResourceById, 
    getFileByID, 
    deleteResource, 
    getResourcesByForm } from "../controllers/resource.js";
//RETRIEVE
export const getSecondarySchemes = async (req, res) => {
    return getResources(req, res, 'secondary.schemes', "elimufi1_secondary");
};
export const getSecondaryNotes = async (req, res) => {
    return getResources(req, res, 'revision_notes', "elimufi1_secondary");
};
export const getKcseTrialExaminations = async (req, res) => {
    return getResources(req, res, 'trial_examinations', "elimufi1_secondary");
};
export const getSecondaryFullSetExaminations = async (req, res) => {
    return getResources(req, res, 'fullset_examinations', "elimufi1_secondary");
};
export const getSecondaryHolidayRevisions = async (req, res) => {
    return getResources(req, res, 'holiday_assignments', "elimufi1_secondary");
};
export const getSecondaryPastPapers = async (req, res) => {
    return getResources(req, res, 'ksce_past_papers', "elimufi1_secondary");
};

//RETRIEVE PER YEAR
export const getFullSetExaminationsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'fullset_examinations', "elimufi1_secondary");
    }
export const getSecondaryNotesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'revision_notes', "elimufi1_secondary");
    }
export const getSecondarySchemesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'schemes', "elimufi1_secondary");
    }
export const getSecondaryKCSEtrialsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'trial_examinations', "elimufi1_secondary");
    }
export const getSecondaryKCSEPastPapersByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'ksce_past_papers', "elimufi1_secondary");
    }
export const getSecondaryHolidayRevisionsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'holiday_assignments', "elimufi1_secondary");
    }
export const getSecondarySchemesByForm = async (req, res) => {
    return getResourcesByForm(req, res, 'schemes', "elimufi1_secondary");
    }
//GET FILE BY ID
export const getSecondarySchemeFileByID =async(req, res)=>{
        return getFileByID(req, res, 'schemes', "elimufi1_secondary")
}
export const getSecondaryKCSEtrialsFileByID =async(req, res)=>{
        return getFileByID(req, res, 'trial_examinations', "elimufi1_secondary")
}
export const getSecondaryKCSEPastPapersFileByID =async(req, res)=>{
        return getFileByID(req, res, 'ksce_past_papers', "elimufi1_secondary")
}
export const getSecondaryHolidayRevisionsFileByID =async(req, res)=>{
        return getFileByID(req, res, 'holiday_assignments', "elimufi1_secondary")
}
export const getFullSetExaminationsFileByID =async(req, res)=>{
        return getFileByID(req, res, 'fullset_examinations', "elimufi1_secondary")
}
export const getSecondaryNotesFileByID =async(req, res)=>{
        return getFileByID(req, res, 'revision_notes', "elimufi1_secondary")
}
// UPDATE BY ID
export const updateSecondarySchemeByID = async (req, res) => {
    return updateResourceById(req, res, 'schemes', "elimufi1_secondary");
};
export const updateSecondaryNotesByID = async (req, res) => {
    return updateResourceById(req, res, 'revision_notes', "elimufi1_secondary");
};
export const updateKCSETrialExaminationsByID = async (req, res) => {
    return updateResourceById(req, res, 'trial_examinations', "elimufi1_secondary");
};
export const updateSecondaryFullSetExaminationByID = async (req, res) => {
    return updateResourceById(req, res, 'fullset_examinations', "elimufi1_secondary");
};
export const updateSecondaryHolidayRevisionsByID = async (req, res) => {
    return updateResourceById(req, res, 'holiday_assignments', "elimufi1_secondary");
};
export const updateSecondaryPastPapersByID = async (req, res) => {
    return updateResourceById(req, res, 'ksce_past_papers', "elimufi1_secondary");
};

//DELETE BY ID
export const deleteSecondarySchemeByID = async (req, res) => {
    return deleteResource(req, res, 'schemes', "elimufi1_secondary");
};
export const deleteSecondaryNotesByID = async (req, res) => {
    return deleteResource(req, res, 'revision_notes', "elimufi1_secondary");
};
export const deleteKCSETrialExaminationsByID = async (req, res) => {
    return deleteResource(req, res, 'trial_examinations', "elimufi1_secondary");
};
export const deleteSecondaryFullSetExaminationByID = async (req, res) => {
    return deleteResource(req, res, 'fullset_examinations', "elimufi1_secondary");
};
export const deleteSecondaryHolidayRevisionsByID = async (req, res) => {
    return deleteResource(req, res, 'holiday_assignments', "elimufi1_secondary");
};
export const deleteSecondaryPastPapersByID = async (req, res) => {
    return deleteResource(req, res, 'ksce_past_papers', "elimufi1_secondary");
};