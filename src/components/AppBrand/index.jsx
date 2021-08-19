import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import logo from 'assets/logo.svg';
import PAGE_URL from 'commons/constants/routes';
import { Logo } from './style';

const AppBrand = ({ history: { push }, ...props }) => {
  const handleClick = () => push(PAGE_URL.HOME);

  return <Logo src={logo} onClick={handleClick} alt="Severino" {...props} />;
};

AppBrand.propTypes = {
  history: PropTypes.object,
};

export default withRouter(AppBrand);
