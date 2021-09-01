import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { useField } from 'formik';
import { getMask, formats } from 'commons/utils/mask';
import TextField from './TextField';

const MaskedTextField = ({ mask, disabled, name, ...otherProps }) => {
  const [field] = useField(name);
  const { value, onChange, onBlur } = field;
  const maskFormat = getMask(mask, value);

  return (
    <InputMask
      mask={maskFormat}
      maskChar={null}
      formatChars={formats}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    >
      {inputProps => (
        <TextField
          {...inputProps}
          disabled={disabled}
          onChange={onChange}
          name={name}
          {...otherProps}
        />
      )}
    </InputMask>
  );
};

MaskedTextField.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default MaskedTextField;
