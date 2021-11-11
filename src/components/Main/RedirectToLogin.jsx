import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PAGE_URL from 'commons/constants/routes';

const RedirectToLogin = ({ path }) => (
  <Redirect
    to={{
      pathname: PAGE_URL.LOGIN,
      state: {
        redirect: path,
      },
    }}
  />
);

RedirectToLogin.propTypes = {
  path: PropTypes.string,
};

export default RedirectToLogin;
