import { ibgeApi as api } from '../api';

export const ibgeRoutes = {
  states: '/localidades/estados?orderBy=nome',
  citiesByState: state =>
    `/localidades/estados/${state}/municipios?orderBy=nome`,
};

const getStates = () => api.get(ibgeRoutes.states);
const getCitiesByState = state => api.get(ibgeRoutes.citiesByState(state));

const ibgeApi = {
  getStates,
  getCitiesByState,
};

export default ibgeApi;
