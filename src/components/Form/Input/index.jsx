import PropTypes from 'prop-types';
import TextField from './TextField';
import MaskedTextField from './MaskedTextField';

const Input = props =>
  props.mask ? <MaskedTextField {...props} /> : <TextField {...props} />;

Input.propTypes = {
  mask: PropTypes.string,
};

export default Input;
