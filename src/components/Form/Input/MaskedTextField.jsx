import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { getMask, formats } from 'commons/utils/mask';
import TextField from './TextField';

const MaskedTextField = ({
  mask,
  value,
  disabled,
  onChange,
  onBlur,
  ...otherProps
}) => {
  const maskFormat = getMask(mask, value);

  const commonProps = { value, disabled, onChange, onBlur };

  return (
    <InputMask
      mask={maskFormat}
      maskChar={null}
      formatChars={formats}
      {...commonProps}
    >
      {inputProps => (
        <TextField {...inputProps} {...commonProps} {...otherProps} />
      )}
    </InputMask>
  );
};

MaskedTextField.propTypes = {
  mask: PropTypes.string.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default MaskedTextField;
