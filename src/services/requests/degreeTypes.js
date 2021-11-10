import api from '../api';

export const degreeTypesRoutes = {
  degreeTypes: '/degree-types',
};

const degreeTypesApi = {
  list: () => api.get(degreeTypesRoutes.degreeTypes),
};

export default degreeTypesApi;
