import {getResources, 
        getFileByID, 
        deleteResource, 
        updateResourceById, 
        getResourcesByYear} from "./resource.js"

//CREATE




//RETRIEVE
export const getPrimaryCurriculumDesign = async (req, res) => {
    return getResources(req, res, 'curriculum_designs', "elimufi1_primaryschool"); //check the pool
};
export const getPrimarySchemes = async (req, res) => {
    return getResources(req, res, 'schemes', "elimufi1_primaryschool" );
};
export const getPrimaryAssessmentTools = async (req, res) => {
    return getResources(req, res, 'assessment_tools', "elimufi1_primaryschool");
};
export const getPrimaryRevisionNotes = async (req, res) => {
    return getResources(req, res, 'revision_notes', "elimufi1_primaryschool");
};
export const getPrimaryHolidayAssignments = async (req, res) => {
    return getResources(req, res, 'holiday_assignments', "elimufi1_primaryschool");
};
export const getGrade1Exams = async (req, res) => {
    return getResources(req, res, 'grade1_exams', "elimufi1_primaryschool");
};

export const getGrade2Exams = async (req, res) => {
    return getResources(req, res, 'grade2_exams',"elimufi1_primaryschool");
};
export const getGrade3Exams = async (req, res) => {
    return getResources(req, res, 'grade3_exams',"elimufi1_primaryschool");
};
export const getGrade4Exams = async (req, res) => {
    return getResources(req, res, 'grade4_exams',"elimufi1_primaryschool");
};
export const getGrade5Exams = async (req, res) => {
    return getResources(req, res, 'grade5_exams',"elimufi1_primaryschool");
};
export const getGrade6Exams = async (req, res) => {
    return getResources(req, res, 'grade6_exams',"elimufi1_primaryschool");
};
//GET FILE
export const getPrimaryCurriculumDesignFileByID = async (req, res) => {
    return getFileByID(req, res, 'curriculum_designs',"elimufi1_primaryschool");
};
export const getPrimarySchemesFileByID = async (req, res) => {
    return getFileByID(req, res, 'schemes',"elimufi1_primaryschool");
};
export const getPrimaryAssessmentToolsFileByID = async (req, res) => {
    return getFileByID(req, res, 'assessment_tools',"elimufi1_primaryschool");
};
export const getPrimaryRevisionNotesFileByID = async (req, res) => {
    return getFileByID(req, res, 'revision_notes',"elimufi1_primaryschool");
};
export const getPrimaryHolidayAssignmentsFileByID = async (req, res) => {
    return getFileByID(req, res, 'holiday_assignments',"elimufi1_primaryschool");
};
export const getGrade1ExamsFileByID = async (req, res) => {
    return getFileByID(req, res, 'grade1_exams',"elimufi1_primaryschool");
};

export const getGrade2ExamsFileByID = async (req, res) => {
    return getFileByID(req, res, 'grade2_exams',"elimufi1_primaryschool");
};
export const getGrade3ExamsFileByID = async (req, res) => {
    return getFileByID(req, res, 'grade3_exams',"elimufi1_primaryschool");
};
export const getGrade4ExamsFileByID = async (req, res) => {
    return getFileByID(req, res, 'grade4_exams',"elimufi1_primaryschool");
};
export const getGrade5ExamsFileByID = async (req, res) => {
    return getFileByID(req, res, 'grade5_exams', "elimufi1_primaryschool");
};
export const getGrade6ExamsFileByID = async (req, res) => {
    return getFileByID(req, res, 'grade6_exams',"elimufi1_primaryschool");
};
//RETRIEVE BY YEAR.
export const getPrimaryRevisionNotesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'revision_notes',"elimufi1_primaryschool");
}
export const getPrimaryHolidayAssignmentsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'holiday_assignments',"elimufi1_primaryschool");
}
export const getPrimaryCurriculumDesignByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'curriculum_designs',"elimufi1_primaryschool");
}
export const getPrimaryAssessmentToolsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'assessment_tools',"elimufi1_primaryschool");
}
export const getPrimarySchemesByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'schemes',"elimufi1_primaryschool");
}
export const getGrade1ExamsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'grade1_exams',"elimufi1_primaryschool");
}

export const getGrade2ExamsByYear = async (req, res) => {
return getResourcesByYear(req, res, 'grade2_exams',"elimufi1_primaryschool");
}  
export const getGrade3ExamsByYear = async (req, res) => {
return getResourcesByYear(req, res, 'grade3_exams',"elimufi1_primaryschool");
}  
export const getGrade4ExamsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'grade4_exams',"elimufi1_primaryschool");
}
export const getGrade5ExamsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'grade5_exams',"elimufi1_primaryschool");
}
export const getGrade6ExamsByYear = async (req, res) => {
    return getResourcesByYear(req, res, 'grade6_exams',"elimufi1_primaryschool");
}


// UPDATE BY ID
export const updatePrimarySchemeByID = async (req, res) => {
    return updateResourceById(req, res, 'schemes',"elimufi1_primaryschool");
};
export const updatePrimaryCurriculumDesignByID = async (req, res) => {
    return updateResourceById(req, res, 'curriculum_designs',"elimufi1_primaryschool");
};
export const updatePrimaryAssessmentToolsByID = async (req, res) => {
    return updateResourceById(req, res, 'assessment_tools',"elimufi1_primaryschool");
};
export const updatePrimaryRevisionNotesByID = async (req, res) => {
    return updateResourceById(req, res, 'revision_notes',"elimufi1_primaryschool");
};
export const updatePrimaryHolidayAssignmentsByID = async (req, res) => {
    return updateResourceById(req, res, 'holiday_assignments',"elimufi1_primaryschool");
};
export const updateGrade1ExamsByID = async (req, res) => {
    return updateResourceById(req, res, 'grade1_exams',"elimufi1_primaryschool");
};

export const updateGrade2ExamsByID = async (req, res) => {
    return updateResourceById(req, res, 'grade2_exams',"elimufi1_primaryschool");
};
export const updateGrade3ExamsByID = async (req, res) => {
    return updateResourceById(req, res, 'grade3_exams',"elimufi1_primaryschool");
};
export const updateGrade4ExamsByID = async (req, res) => {
    return updateResourceById(req, res, 'grade4_exams',"elimufi1_primaryschool");
};
export const updateGrade5ExamsByID = async (req, res) => {
    return updateResourceById(req, res, 'grade5_exams',"elimufi1_primaryschool");
};
export const updateGrade6ExamsByID = async (req, res) => {
    return updateResourceById(req, res, 'grade6_exams',"elimufi1_primaryschool");
};
//DELETE BY ID

export const deletePrimaryCurriculumDesignByID = async (req, res) => {
    return deleteResource(req, res, 'curriculum_designs',"elimufi1_primaryschool");
};
export const deletePrimarySchemesByID = async (req, res) => {
    return deleteResource(req, res, 'schemes',"elimufi1_primaryschool");
};
export const deletePrimaryAssessmentToolsByID = async (req, res) => {
    return deleteResource(req, res, 'assessment_tools',"elimufi1_primaryschool");
};
export const deletePrimaryRevisionNotesByID = async (req, res) => {
    return deleteResource(req, res, 'revision_notes',"elimufi1_primaryschool");
};
export const deletePrimaryHolidayAssignmentsByID = async (req, res) => {
    return deleteResource(req, res, 'holiday_assignments');
};
export const deleteGrade1ExamsByID = async (req, res) => {
    return deleteResource(req, res, 'grade1_exams',"elimufi1_primaryschool");
};

export const deleteGrade2ExamsByID = async (req, res) => {
    return deleteResource(req, res, 'grade2_exams',"elimufi1_primaryschool");
};
export const deleteGrade3ExamsByID = async (req, res) => {
    return deleteResource(req, res, 'grade3_exams',"elimufi1_primaryschool");
};
export const deleteGrade4ExamsByID = async (req, res) => {
    return deleteResource(req, res, 'grade4_exams',"elimufi1_primaryschool");
};
export const deleteGrade5ExamsByID = async (req, res) => {
    return deleteResource(req, res, 'grade5_exams',"elimufi1_primaryschool");
};
export const deleteGrade6ExamsByID = async (req, res) => {
    return deleteResource(req, res, 'grade6_exams',"elimufi1_primaryschool");
};