import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { homeRoutes } from 'routes/home';
import logo from 'assets/logo.svg';
import { Logo } from './style';

const AppBrand = ({ history: { push }, ...props }) => {
  const handleClick = () => push(homeRoutes.main);

  return <Logo src={logo} onClick={handleClick} alt="Severino" {...props} />;
};

AppBrand.propTypes = {
  history: PropTypes.object,
};

export default withRouter(AppBrand);
