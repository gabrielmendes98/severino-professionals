import api from '../api';

export const jobTypesRoutes = {
  jobTypes: '/job-types',
};

const jobTypesApi = {
  list: () => api.get(jobTypesRoutes.jobTypes),
};

export default jobTypesApi;
