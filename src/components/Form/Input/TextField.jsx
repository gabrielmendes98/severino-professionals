import MuiTextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const TextField = ({ name, id, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    fullWidth: true,
    variant: 'outlined',
    size: 'small',
    id: id || name,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <MuiTextField {...configTextfield} />;
};

TextField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default TextField;
