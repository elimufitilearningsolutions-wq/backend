import {getResources, 
        getFileByID, 
        deleteResource, 
        updateResourceById, 
        getResourcesByYear} from "./resource.js"

//CREATE




//RETRIEVE
export const getSeniorSchoolCurriculumDesign = async (req, res) => {
    return getResources(req, res, 'curriculum_designs', "elimufi1_senior"); //check the pool
};
export const getSeniorSchoolSchemes = async (req, res) => {
    return getResources(req, res, 'schemes', "elimufi1_senior" );
};

export const getSeniorSchoolRevisionNotes = async (req, res) => {
    return getResources(req, res, 'notes', "elimufi1_senior");
};


export const getGrade10Exams = async (req, res) => {
    return getResources(req, res, 'grade10_evaluations',"elimufi1_senior");
};


//GET FILE /Download
export const getSeniorSchoolCurriculumDesignFileByID = async (req, res) => {
    return getFileByID(req, res, 'curriculum_designs',"elimufi1_senior");
};
export const getSeniorSchoolLessonPlanFileByID = async (req, res) => {
    return getFileByID(req, res, 'lesson_plans',"elimufi1_senior");
};

export const getSeniorSchoolSchemesFileByID = async (req, res) => {
    return getFileByID(req, res, 'schemes',"elimufi1_senior");
};

export const getSeniorSchoolRevisionNotesFileByID = async (req, res) => {
    return getFileByID(req, res, 'revision_notes',"elimufi1_senior");
};

export const getGrade10ExamsFileByID = async (req, res) => {
    return getFileByID(req, res, 'grade10_evaluations',"elimufi1_senior");
};

//RETRIEVE BY YEAR.
export const getSeniorSchoolRevisionNotesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'notes',"elimufi1_senior");
}
export const getSeniorSchoolLessonPlanByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'notes',"elimufi1_senior");
}

export const getSeniorSchoolCurriculumDesignByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'curriculum_designs',"elimufi1_senior");
}

export const getSeniorSchoolSchemesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'schemes',"elimufi1_senior");
}
export const getGrade10EvaluationsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'grade10_evaluations',"elimufi1_senior");
}
export const getGrade10ExamsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'grade10_exams',"elimufi1_senior");
}



// UPDATE BY ID
export const updateSeniorSchoolSchemeByID = async (req, res) => {
    return updateResourceById(req, res, 'schemes',"elimufi1_senior");
};
export const updateSeniorSchoolCurriculumDesignByID = async (req, res) => {
    return updateResourceById(req, res, 'curriculum_designs',"elimufi1_senior");
};
export const updateSeniorSchoolAssessmentToolsByID = async (req, res) => {
    return updateResourceById(req, res, 'assessment_tools',"elimufi1_senior");
};
export const updateSeniorSchoolRevisionNotesByID = async (req, res) => {
    return updateResourceById(req, res, 'revision_notes',"elimufi1_senior");
};
export const updateSeniorSchoolHolidayAssignmentsByID = async (req, res) => {
    return updateResourceById(req, res, 'holiday_assignments',"elimufi1_senior");
};
export const updateGrade10ExamsByID = async (req, res) => {
    return updateResourceById(req, res, 'grade10_evaluations',"elimufi1_senior");
};

//DELETE BY ID

export const deleteSeniorSchoolCurriculumDesignByID = async (req, res) => {
    return deleteResource(req, res, 'curriculum_designs',"elimufi1_senior");
};
export const deleteSeniorSchoolSchemesByID = async (req, res) => {
    return deleteResource(req, res, 'schemes',"elimufi1_senior");
};
export const deleteSeniorSchoolRevisionNotesByID = async (req, res) => {
    return deleteResource(req, res, 'revision_notes',"elimufi1_senior");
};

export const deleteGrade10ExamsByID = async (req, res) => {
    return deleteResource(req, res, 'grade10_evaluations',"elimufi1_senior");
};
