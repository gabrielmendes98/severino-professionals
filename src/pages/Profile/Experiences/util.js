import moment from 'moment';
import experiencesApi from 'services/requests/experiences';
import yup from 'commons/utils/yup';

export const initialValues = {
  role: '',
  jobType: '',
  company: '',
  state: '',
  city: '',
  startDate: '',
  endDate: '',
};

export const validations = yup.object().shape({
  role: yup.string().trim().required(),
  jobType: yup.string().trim().required(),
  state: yup.string().trim().required(),
  city: yup.string().trim().required(),
  startDate: yup.string().dateStartEnd().required(),
  endDate: yup.string().dateStartEnd('startDate').required(),
});

export const parseStateToSelect = states =>
  states.map(state => ({ value: state.sigla, label: state.sigla }));

export const parseCityToSelect = cities =>
  cities.map(city => ({ label: city.nome, value: city.nome }));

export const parseJobTypes = jobTypes =>
  jobTypes.map(jobType => ({ label: jobType.description, value: jobType.id }));

export const formatCompanyJobType = experience =>
  experience.company
    ? `${experience.company} - ${experience.job?.description}`
    : experience.job?.description;

export const formatExperienceTime = experience => {
  const startDate = moment(experience.startDate).format('MM/YYYY');
  const endDate = moment(experience.endDate).format('MM/YYYY');
  const startToEnd = moment(experience.startDate).from(
    experience.endDate,
    true,
  );

  return `${startDate} - ${endDate} (${startToEnd})`;
};

export const formatExperienceLocation = experience =>
  `${experience.city}, ${experience.state}`;

export const parseExperienceToFrom = experience => {
  const { jobId, profileId, job, ...other } = experience;

  return {
    ...initialValues,
    ...other,
    jobType: jobId,
  };
};

export const fetchExperiences = userId => experiencesApi.getList(userId);

export const cancelEditing = (handleReset, setFormData, setEditing) => {
  handleReset();
  setFormData(initialValues);
  setEditing(false);
};

export const removeExperience = (userId, experienceId) =>
  experiencesApi.exclude(userId, experienceId);
