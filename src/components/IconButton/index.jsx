import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { StyledIconButton } from './style';
import { isDefaultColor } from './util';

const IconButton = ({ children, color, tooltip, ...props }) => {
  const { defaultColor, customColor } = isDefaultColor(color)
    ? { defaultColor: color }
    : { customColor: color };

  return (
    <Tooltip title={tooltip}>
      <StyledIconButton
        {...props}
        color={defaultColor}
        customColor={customColor}
        aria-label={tooltip}
      >
        {children}
      </StyledIconButton>
    </Tooltip>
  );
};

IconButton.propTypes = {
  tooltip: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
  }),
};

IconButton.defaultProps = {
  variant: 'contained',
  color: 'primary',
};

export default IconButton;
