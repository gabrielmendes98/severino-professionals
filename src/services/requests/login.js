import api from '../api';

export const loginRoutes = {
  login: '/workers/session',
};

const loginApi = {
  login: (email, password) => api.post(loginRoutes.login, { email, password }),
};

export default loginApi;
