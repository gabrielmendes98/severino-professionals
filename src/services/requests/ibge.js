import { ibgeApi as api } from '../api';

export const ibgeRoutes = {
  states: '/localidades/estados?orderBy=nome',
  citiesByState: state =>
    `/localidades/estados/${state}/municipios?orderBy=nome`,
};

const ibgeApi = {
  getStates: () => api.get(ibgeRoutes.states),
  getCitiesByState: state => api.get(ibgeRoutes.citiesByState(state)),
};

export default ibgeApi;
