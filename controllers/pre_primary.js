import { createResource, 
    getResources, 
    deleteResource, 
    getFileByID, 
    getResourcesByYear, 
    updateResourceById, 
    deleteAllResources} from "./resource.js"




// RETRIEVE ALL RESOURCES

export const getPriPrimarySchemes = async (req, res) => {
    return getResources(req, res, "schemes", "elimufi1_preprimary"); //check the pool
};
export const getPriPrimaryCurriculumDesign = async (req, res) => {
return getResources(req, res, "curriculum_designs", "elimufi1_preprimary");
}
export const getPlayGroupExams = async (req, res) => {
return getResources(req, res, "playgroup_exams", "elimufi1_preprimary");
}
export const getPP1Exams = async (req, res) => {
return getResources(req, res, "pp1_exams", "elimufi1_preprimary");
}
export const getPP2Exams = async (req, res) => {
return getResources(req, res, "pp2_exams", "elimufi1_preprimary");
}
export const getPriPrimaryHolidayAssignments = async (req, res) => {
return getResources(req, res, "holiday_assignments", "elimufi1_preprimary");
}



// RETRIEVE RESOURCES BY YEAR
export const getPriPrimaryCurriculumDesignByYear = async (req, res) => {
return getResourcesByYear(req, res, 'curriculum_designs',"elimufi1_preprimary" );
}
export const getPriPrimaryTeachingAidsByYear = async (req, res) => {
return getResourcesByYear(req, res, 'teaching_aids',"elimufi1_preprimary" );
}
export const getPriPrimaryLessonPlanByYear = async (req, res) => {
return getResourcesByYear(req, res, 'lesson_plans',"elimufi1_preprimary" );
}

export const getPlayGroupColouringByYear = async (req, res) => {
return getResourcesByYear(req, res, 'colouring_pages',"elimufi1_preprimary" );
}


export const getPrePrimarySchemesByYear = async (req, res) => {
return getResourcesByYear(req, res, 'schemes',"elimufi1_preprimary");
}
export const getPlayGroupExamsByYear = async (req, res) => {
return getResourcesByYear(req, res, 'playgroup_exams', "elimufi1_preprimary");
}
export const getPPE1ExamsByYear = async (req, res) => {
return getResourcesByYear(req, res, 'pp1_exams', "elimufi1_preprimary");
}
export const getPPE2ExamsByYear = async (req, res) => {
return getResourcesByYear(req, res, 'pp2_exams', "elimufi1_preprimary");
}
export const getPriPrimaryHolidayAssignmentsByYear = async (req, res) => {
return getResourcesByYear(req, res, 'holiday_assignments', "elimufi1_preprimary");
}

// UPDATE RESOURCE BY ID
export const updatePriPrimarySchemeByID = async (req, res) => {
return updateResourceById(req, res, "schemes", "elimufi1_preprimary");
}
export const updatePlayGroupExamByID = async (req, res) => {
return updateResourceById(req, res, 'playgroup_exams', "elimufi1_preprimary");
}

export const updatePriPrimaryHolidayAssignmentsByID = async (req, res) => {
return updateResourceById(req, res, 'holiday_assignments', "elimufi1_preprimary");
}
export const updatePriPrimaryCurriculumDesignByID = async (req, res) => {
return updateResourceById(req, res, "curriculum_designs", "elimufi1_preprimary");
}

// DELETE RESOURCE BY ID
export const deletePriPrimarySchemeByID = async (req, res) => {
return deleteResource(req, res, "schemes", "elimufi1_preprimary");
}
export const deletePP1ExamByID = async (req, res) => {
return deleteResource(req, res, 'pp1_exams', "elimufi1_preprimary");
}
export const deletePP2ExamByID = async (req, res) => {
return deleteResource(req, res, 'pp2_exams', "elimufi1_preprimary");
}
export const deletePlayGroupExamByID = async (req, res) => {
return deleteResource(req, res, 'playgroup_exams', "elimufi1_preprimary");
}
export const deletePriPrimaryHolidayAssignmentsByID = async (req, res) => {
return deleteResource(req, res, 'holiday_assignments', "elimufi1_preprimary");
}
export const deletePriPrimaryCurriculumDesignByID = async (req, res) => {
return deleteResource(req, res, "curriculum_designs", "elimufi1_preprimary");
}

//Delete All
export const deleteAllPrePrimaryCurriculuDesigns = async (req, res) => {
    return deleteAllResources(req, res, "curriculum_designs", "elimufi1_preprimary")
}
export const deleteAllPrePrimarySchemes = async (req, res) => {
    return deleteAllResources(req, res, "schemes", "elimufi1_preprimary")
}


// DOWNLOAD FILE BY ID
export const getPriPrimarySchemeFileByID = async (req, res) => {
return getFileByID(req, res, 'schemes', "elimufi1_preprimary");
}
export const getPriPrimaryTeachingAidFileByID = async (req, res) => {
return getFileByID(req, res, 'teaching_aids', "elimufi1_preprimary");
}
export const getPriPrimaryLessonPlanFileByID = async (req, res) => {
return getFileByID(req, res, 'lesson_plans', "elimufi1_preprimary");
}

export const getPlayGroupExamByID = async (req, res) => {
return getFileByID(req, res, 'playgroup_exams', "elimufi1_preprimary");
}
export const getPlayGroupColouringByID = async (req, res) => {
return getFileByID(req, res, 'colouring_pages', "elimufi1_preprimary");
}

export const getPP1ExamByID = async (req, res) => {
return getFileByID(req, res, 'pp1_exams', "elimufi1_preprimary");
}
export const getPP2ExamByID = async (req, res) => {
return getFileByID(req, res, 'pp2_exams', "elimufi1_preprimary");
}
export const getPrePriPrimaryHolidayAssignmentFileByID = async (req, res) => {
return getFileByID(req, res, 'holiday_assignments', "elimufi1_preprimary");
}
export const getPrePrimaryRevisionFileByID = async (req, res) => {
return getFileByID(req, res, 'holiday_revisions', "elimufi1_preprimary");
}
export const getPriPrimaryCurriculumDesignFileByID = async (req, res) => {
return getFileByID(req, res, 'curriculum_designs', "elimufi1_preprimary");
}
