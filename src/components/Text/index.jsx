import PropTypes from 'prop-types';
import { Typography } from './style';

const Text = ({
  size,
  color,
  margin,
  weight,
  required,
  children,
  uppercase,
  ...props
}) => {
  const transform = uppercase ? 'uppercase' : '';
  const requiredContent = required && children ? ' *' : '';

  return (
    <Typography
      size={size}
      margin={margin}
      weight={weight}
      textcolor={color}
      transform={transform}
      required={required}
      {...props}
    >
      {children}
      {requiredContent}
    </Typography>
  );
};

Text.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
  }),
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  children: PropTypes.any.isRequired,
  uppercase: PropTypes.bool,
};

export default Text;
