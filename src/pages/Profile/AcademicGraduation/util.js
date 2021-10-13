import yup from 'commons/utils/yup';

export const initialValues = {
  institution: '',
  degree: '',
  studyArea: '',
};

export const validations = yup.object().shape({
  institution: yup.string().trim().required(),
  degree: yup.string().trim().required(),
});

export const cancelEditing = (handleReset, setFormData, setEditing) => {
  handleReset();
  setFormData(initialValues);
  setEditing(false);
};

export const parseDegreesToSelect = degrees =>
  degrees.map(degree => ({ label: degree.description, value: degree.id }));

export const parseAcademicGraduationToForm = academicGraduation => {
  const { institution, studyArea, id, degreeId } = academicGraduation;

  return {
    id,
    degree: degreeId,
    institution,
    studyArea,
  };
};
