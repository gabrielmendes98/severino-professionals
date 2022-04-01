import axios from 'axios';
import { ERRORS } from 'commons/constants';
import loading from 'commons/utils/loading';
import { toast } from 'commons/utils/toast';

const createApi = (baseURL = '', config = {}) => {
  const api = axios.create({
    baseURL,
    ...config,
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
      const message = error.response?.data?.message;
      toast.error(message || ERRORS.DEFAULT);
      return Promise.reject(error);
    },
  );

  return api;
};

const api = createApi(process.env.REACT_APP_API_URL);
const filesApi = createApi(process.env.REACT_APP_API_URL, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export { filesApi };
export default api;
