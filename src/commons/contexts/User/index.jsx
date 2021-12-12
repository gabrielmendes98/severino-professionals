import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import api, { filesApi } from 'services/api';
import loginApi from 'services/requests/login';
import workersApi from 'services/requests/workers';
import { toast } from 'commons/utils/toast';
import { getToken, removeToken, setToken } from 'commons/utils/storage';
import PAGE_URL from 'commons/constants/routes';
import Loading from 'components/Loading';
import { getOAuthToken } from './util';

const setApiHeaders = token => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
  filesApi.defaults.headers.Authorization = `Bearer ${token}`;
};

export const UserContext = createContext();

const UserProvider = ({ children, history }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const configureUser = ({ token }) => {
    const decodedToken = jwtDecode(token);
    setToken(token);
    setUser(decodedToken.user);
    setApiHeaders(token);
  };

  const login = ({ email, password }) =>
    loginApi.login(email, password).then(configureUser);

  const oAuthLogin = (response, provider) => {
    const oAuthToken = getOAuthToken(response, provider);
    return loginApi.oAuthLogin(oAuthToken, provider).then(configureUser);
  };

  const handleOAuthFailure = () =>
    toast.error('Erro com a autenticação, tente novamente');

  const signOut = () => {
    setUser(null);
    removeToken();
    setApiHeaders(undefined);
    history.push(PAGE_URL.HOME);
  };

  const changePassword = ({ newPassword, currentPassword }) => {
    workersApi.update(user.id, { newPassword, currentPassword }).then(() => {
      toast.success('Senha trocada com sucesso!');
      history.push(PAGE_URL.PROFILE);
    });
  };

  const signUp = data =>
    workersApi
      .create(data)
      .then(() => login({ email: data.email, password: data.password }));
  const signed = Boolean(user);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.user);
      setApiHeaders(token);
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        login,
        user,
        signed,
        signOut,
        changePassword,
        signUp,
        oAuthLogin,
        handleOAuthFailure,
      }}
    >
      {loading ? <Loading fullScreen /> : children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object,
};

export default withRouter(UserProvider);
