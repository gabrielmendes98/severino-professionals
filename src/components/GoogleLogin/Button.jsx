import PropTypes from 'prop-types';
import { O_AUTH_PROVIDERS } from 'commons/constants';
import { GoogleLogin } from './style';

const GoogleLoginButton = ({ handleOAuthLogin, handleOAuthFailure }) => (
  <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Entrar com Google"
    onSuccess={response => handleOAuthLogin(response, O_AUTH_PROVIDERS.GOOGLE)}
    onFailure={handleOAuthFailure}
    cookiePolicy={'single_host_origin'}
  />
);

GoogleLoginButton.propTypes = {
  handleOAuthLogin: PropTypes.func.isRequired,
  handleOAuthFailure: PropTypes.func.isRequired,
};

export default GoogleLoginButton;
