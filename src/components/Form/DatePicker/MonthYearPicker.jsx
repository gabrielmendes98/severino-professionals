import { DatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { handleValue } from './util';

const MonthYearPicker = ({ name, id, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const onChange = value => setFieldValue(name, value.format());

  const configTextfield = {
    ...field,
    autoOk: true,
    id: id || name,
    fullWidth: true,
    onChange,
    views: ['year', 'month'],
    inputVariant: 'outlined',
    size: 'small',
    value: handleValue(field.value),
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <DatePicker {...configTextfield} />;
};

MonthYearPicker.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default MonthYearPicker;
