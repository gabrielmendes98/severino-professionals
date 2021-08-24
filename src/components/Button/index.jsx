import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';

const Button = ({ children, ...props }) => (
  <MuiButton {...props}>{children}</MuiButton>
);

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  color: PropTypes.string,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  type: 'button',
  color: 'primary',
  variant: 'contained',
};

export default Button;
