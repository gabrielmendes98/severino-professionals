import PropTypes from 'prop-types';
import { Doodle as StyledDoodle } from './style';

const Doodle = ({ size, ...props }) => <StyledDoodle size={size} {...props} />;

Doodle.propTypes = {
  size: PropTypes.number.isRequired,
};

export default Doodle;
