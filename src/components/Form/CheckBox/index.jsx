import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiCheckbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { useField } from 'formik';

const Checkbox = ({ name, label, legend, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configCheckbox = {
    ...field,
    color: 'primary',
    ...otherProps,
  };

  const error = Boolean(meta && meta.touched && meta.error);
  const helperText = meta?.error;

  return (
    <FormControl error={error}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <MuiCheckbox checked={configCheckbox.value} {...configCheckbox} />
          }
          label={label}
        />
      </FormGroup>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  legend: PropTypes.string,
  error: PropTypes.bool,
};

export default Checkbox;
