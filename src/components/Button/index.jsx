import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';

const Button = ({ children, ...props }) => (
  <MuiButton {...props}>{children}</MuiButton>
);

Button.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Button;
