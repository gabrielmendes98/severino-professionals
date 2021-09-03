import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import api from 'services/api';
import API_ROUTES from 'services/routes';
import { toast } from 'commons/utils/toast';
import { getToken, removeToken, setToken } from 'commons/utils/storage';
import PAGE_URL from 'commons/constants/routes';
import Loading from 'components/Loading';

export const UserContext = createContext();

const UserProvider = ({ children, history }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const login = ({ email, password }) =>
    api.post(API_ROUTES.LOGIN, { email, password }).then(({ token }) => {
      const decodedToken = jwtDecode(token);
      setToken(token);
      setUser(decodedToken.user);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      toast.success('Bem-vindo(a) ao Severino!');
      history.push(PAGE_URL.PROFILE);
    });

  const signOut = () => {
    setUser(null);
    removeToken();
    api.defaults.headers.Authorization = undefined;
  };

  const changePassword = ({ newPassword, currentPassword }) => {
    api
      .put(API_ROUTES.WORKER_ID(user.id), { newPassword, currentPassword })
      .then(() => {
        toast.success('Senha trocada com sucesso!');
        history.push(PAGE_URL.PROFILE);
      });
  };

  const signUp = data => {
    api
      .post(API_ROUTES.WORKERS, data)
      .then(() => login({ email: data.email, password: data.password }));
  };

  const signed = Boolean(user);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.user);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{ login, user, signed, signOut, changePassword, signUp }}
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
