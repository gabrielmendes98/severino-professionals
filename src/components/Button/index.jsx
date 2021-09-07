import PropTypes from 'prop-types';
import { StyledButton } from './style';
import { isDefaultColor } from './util';

const Button = ({ children, color, ...props }) => {
  const { defaultColor, customColor } = isDefaultColor(color)
    ? { defaultColor: color }
    : { customColor: color };

  return (
    <StyledButton {...props} color={defaultColor} customColor={customColor}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  color: PropTypes.string,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  children: PropTypes.any.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
  }),
};

Button.defaultProps = {
  type: 'button',
  color: 'primary',
  variant: 'contained',
};

export default Button;
