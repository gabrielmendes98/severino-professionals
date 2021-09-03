const API_ROUTES = {
  LOGIN: '/workers/session',
  WORKERS: '/workers',
  WORKER_ID: id => `/workers/${id}`,
};

const IBGE_API_ROUTES = {
  STATES: '/localidades/estados?orderBy=nome',
  CITIES_BY_STATE: state =>
    `/localidades/estados/${state}/municipios?orderBy=nome`,
};

export { IBGE_API_ROUTES };
export default API_ROUTES;
