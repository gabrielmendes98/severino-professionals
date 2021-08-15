import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { Container } from './style';

const sizes = {
  small: '15',
  medium: '20',
  large: '25',
};

const Progress = ({ fullScreen, size, color }) => (
  <CircularProgress size={fullScreen ? 50 : size} color={color} />
);

Progress.propTypes = {
  fullScreen: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(sizes)),
  color: PropTypes.oneOf(['secondary', 'primary']),
};

const Loading = ({ fullScreen, size, color = 'primary' }) =>
  fullScreen ? (
    <Container>
      <Progress fullScreen size={size} color={color} />
    </Container>
  ) : (
    <Progress size={size} color={color} />
  );

Loading.propTypes = {
  fullScreen: Progress.propTypes.fullScreen,
  size: Progress.propTypes.size,
  color: Progress.propTypes.color,
};

Loading.Sizes = {
  ...sizes,
};

export default Loading;
