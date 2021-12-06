import api from '../api';

export const loginRoutes = {
  login: '/workers/session',
  oAuth: '/workers/session/oauth',
};

const loginApi = {
  login: ({ email, password, token }) =>
    api.post(loginRoutes.login, { email, password, token }),

  oAuthLogin: (token, provider) =>
    api.post(loginRoutes.oAuth, { token, provider }),
};

export default loginApi;
