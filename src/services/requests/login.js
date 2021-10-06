import api from '../api';

export const loginRoutes = {
  login: '/workers/session',
};

const login = (email, password) =>
  api.post(loginRoutes.login, { email, password });

const loginApi = {
  login,
};

export default loginApi;
