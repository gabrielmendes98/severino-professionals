import api from '../api';

export const degreeTypesRoutes = {
  degreeTypes: '/degree-types',
};

const getList = () => api.get(degreeTypesRoutes.degreeTypes);

const degreeTypesApi = {
  getList,
};

export default degreeTypesApi;
