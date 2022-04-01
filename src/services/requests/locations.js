import api from '../api';

export const locationRoutes = {
  states: '/locations/states',
  citiesByState: stateId => `/locations/states/${stateId}/cities`,
};

const locationsApi = {
  getStates: () => api.get(locationRoutes.states),
  getCitiesByState: state => api.get(locationRoutes.citiesByState(state)),
};

export default locationsApi;
