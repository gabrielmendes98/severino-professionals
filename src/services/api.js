import axios from 'axios';
import loading from 'commons/utils/loading';

const createApi = (baseURL = '') => {
  const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use(
    config => {
      loading.show();
      return config;
    },
    error => {
      loading.hide();
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    response => {
      loading.hide();
      return response.data;
    },
    error => {
      loading.hide();
      return Promise.reject(error);
    },
  );

  return api;
};

const defaultApi = createApi(process.env.REACT_APP_API_URL);
const ibgeApi = createApi(process.env.REACT_APP_IBGE_API_URL);

export { ibgeApi };
export default defaultApi;
