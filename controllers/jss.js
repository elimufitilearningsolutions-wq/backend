import { deleteAllResources, deleteResource, updateResourceById, getResources,getResourcesByYear, getFileByID } 
from "./resource.js";
// CREATION OF JSS RESOURCES

//RETRIEVE ALL (JSS)
export const getJssSchemes = async (req, res) => {
    return getResources(req, res, 'schemes', "elimufi1_jss");
};
export const getJssLessonPlans = async (req, res) => {
    return getResources(req, res, 'lesson_plan', "elimufi1_jss");
};
export const getJssNotes = async (req, res) => {
    return getResources(req, res, 'notes', "elimufi1_jss");
};

export const getJssCurriculumdesign = async (req, res) => {
    return getResources(req, res, 'curriculum_designs',"elimufi1_jss");
};

export const getJssAssessmentTools = async (req, res) => {
    return getResources(req, res, 'assessment_tools',"elimufi1_jss");
};

export const getGrade7Examinations = async (req, res) => {
    return getResources(req, res, 'grade7_examinations',"elimufi1_jss");
};

export const getGrade8Examinations = async (req, res) => {
    return getResources(req, res, 'grade8_examinations',"elimufi1_jss");
};
export const getJssfullSetExaminations = async (req, res) => {
    return getResources(req, res, 'fullset_examinations',"elimufi1_jss");
};

export const getJssHolidayAssignments = async (req, res) => {
    return getResources(req, res, 'holiday_assignments',"elimufi1_jss");
};

//GET BY YEAR
export const getJssAssessmentToolsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'assessment_tools',"elimufi1_jss");
}

export const getJssLessonPlansByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'lesson_plan', "elimufi1_jss");
};
export const getJssSchemesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'schemes',"elimufi1_jss");
}
export const getJssNotesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'notes',"elimufi1_jss");
}
export const getJssHolidayAssignmentsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'holiday_assignments',"elimufi1_jss");
}
export const getGrade7ExaminationsByYear = async (req, res) => {
    return getResources(req, res, 'grade7_examinations',"elimufi1_jss");
};
export const getGrade8ExaminationsByYear = async (req, res) => {
    return getResources(req, res, 'grade8_examinations',"elimufi1_jss");
};

export const getJssfullSetExaminationsByYear = async (req, res) => {
    return getResources(req, res, 'fullset_examinations',"elimufi1_jss");
};
export const getJssCurriculumdesignByYear = async (req, res) => {
    return getResources(req, res, 'curriculum_designs',"elimufi1_jss");
};

// DELETION OF ALL RESOURCES (JSS)
export const deleteJssSchemes = async (req, res) => {
    return deleteAllResources(req, res, 'schemes', "elimufi1_jss");
};
export const deleteJssNotes = async (req, res) => {
    return deleteAllResources(req, res, 'notes', "elimufi1_jss");
};


export const deleteAllJssCurriculumdesigns = async (req, res) => {
    return deleteAllResources(req, res, 'curriculum_designs',"elimufi1_jss");
};

export const deleteJssAssesmentTools = async (req, res) => {
    return deleteAllResources(req, res, 'assessment_tools',"elimufi1_jss");
};

export const deleteGrade7Examinations = async (req, res) => {
    return deleteAllResources(req, res, 'grade7_examinations',"elimufi1_jss");
};

export const deleteGrade8Examinations = async (req, res) => {
    return deleteAllResources(req, res, 'grade8_examinations',"elimufi1_jss");
};

export const deleteAllJssfullSetExaminations = async (req, res) => {
    return deleteAllResources(req, res, 'fullset_examinations',"elimufi1_jss");
};



export const deleteAllJssHassignments = async (req, res) => {
    return deleteResource(req, res, 'holiday_assignments',"elimufi1_jss");
};

//DELETE BY ID (JSS)

export const deleteJssSchemeByID = async (req, res) => {
    return deleteResource(req, res, 'schemes', "elimufi1_jss");
};
export const deleteJssNotesByID = async (req, res) => {
    return deleteResource(req, res, 'notes', "elimufi1_jss");
};

export const deleteJssCurriculumdesignByID = async (req, res) => {
    return deleteResource(req, res, 'curriculum_designs',"elimufi1_jss");
};

export const deleteJssAssesmentToolsByID = async (req, res) => {
    return deleteResource(req, res, 'assessment_tools',"elimufi1_jss");
};

export const deleteGrade7ExaminationByID = async (req, res) => {
    return deleteResource(req, res, 'grade7_examinations',"elimufi1_jss");
};

export const deleteGrade8ExaminationByID = async (req, res) => {
    return deleteResource(req, res, 'grade8_examinations',"elimufi1_jss");
};

export const deleteJssfullSetExaminationByID = async (req, res) => {
    return deleteResource(req, res, 'fullset_examinations',"elimufi1_jss");
};



export const deleteJssHassignmentsByID = async (req, res) => {
    return deleteResource(req, res, 'holiday_assignments',"elimufi1_jss");
};

// UPDATE BY ID (JSS)
export const updateJssSchemeByID = async (req, res) => {
    return updateResourceById(req, res, 'schemes', "elimufi1_jss");
};

export const updateJssCurriculumdesignByID = async (req, res) => {
    return ByID(req, res, 'curriculum_designs',"elimufi1_jss");
};

export const updateJssAssesmentToolsByID = async (req, res) => {
    return updateResourceById(req, res, 'assessment_tools',"elimufi1_jss");
};

export const updateGrade7ExaminationByID = async (req, res) => {
    return updateResourceById(req, res, 'grade7_examinations',"elimufi1_jss");
};

export const updateGrade8ExaminationByID = async (req, res) => {
    return updateResourceById(req, res, 'grade8_examinations',"elimufi1_jss");
};

export const updateJssfullSetExaminationByID = async (req, res) => {
    return updateResourceById(req, res, 'fullset_examinations',"elimufi1_jss");
};



export const updateJssHassignmentsByID = async (req, res) => {
    return updateResourceById(req, res, 'holiday_assignments',"elimufi1_jss");
};

//GET FILE BY ID (JSS) && DOWNLOADING FILE
export const getJssSchemeFileByID = async (req, res) => {
    return getFileByID(req, res, 'schemes',"elimufi1_jss");
};
export const getJssLessonPlanFileByID = async (req, res) => {
    return getFileByID(req, res, 'lesson_plan',"elimufi1_jss");
};
export const getJssNotesFileByID = async (req, res) => {
    return getFileByID(req, res, 'notes',"elimufi1_jss");
};

export const getJssCurriculumdesignFileByID = async (req, res) => {
    return getFileByID(req, res, 'curriculum_designs',"elimufi1_jss");
};

export const getJssAssesmentToolsFileByID = async (req, res) => {
    return getFileByID(req, res, 'assessment_tools',"elimufi1_jss");
};

export const getGrade7ExaminationFileByID = async (req, res) => {
    return getFileByID(req, res, 'grade7_examinations',"elimufi1_jss");
};

export const getGrade8ExaminationFileByID = async (req, res) => {
    return getFileByID(req, res, 'grade8_examinations',"elimufi1_jss");
};

export const getJssfullSetExaminationFileByID = async (req, res) => {
    return getFileByID(req, res, 'fullset_examinations',"elimufi1_jss");
};



export const getJssHassignmentsFileByID = async (req, res) => {
    return getFileByID(req, res, 'holiday_assignments',"elimufi1_jss");
};