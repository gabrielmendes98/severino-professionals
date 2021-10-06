import api from '../api';

export const jobTypesRoutes = {
  jobTypes: '/job-types',
};

const getList = () => api.get(jobTypesRoutes.jobTypes);

const jobTypesApi = {
  getList,
};

export default jobTypesApi;
