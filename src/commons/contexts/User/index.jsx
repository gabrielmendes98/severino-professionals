import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import api from 'services/api';
import API_ROUTES from 'services/routes';
import PAGE_URL from 'commons/constants/routes';
import Loading from 'components/Loading';

export const UserContext = createContext();

const UserProvider = ({ children, history }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const login = ({ email, password }) =>
    api.post(API_ROUTES.LOGIN, { email, password }).then(({ token }) => {
      const decodedToken = jwtDecode(token);
      localStorage.setItem('token', token);
      setUser(decodedToken.user);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      history.push(PAGE_URL.PROFILE);
    });

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
  };

  const signed = Boolean(user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.user);
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ login, user, signed, signOut }}>
      {loading ? <Loading fullScreen /> : children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object,
};

export default withRouter(UserProvider);
