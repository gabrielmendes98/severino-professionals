import { useMemo } from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import { getOptions, renderOption } from './util';

const Select = ({
  name,
  options = [],
  value,
  hasEmptyValue,
  emptyStateMessage,
  SelectProps,
  id,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const buildOptions = useMemo(
    () =>
      getOptions(options, hasEmptyValue, emptyStateMessage).map(
        renderOption(name),
      ),
    [name, hasEmptyValue, options, emptyStateMessage],
  );

  const selectProps = {
    displayEmpty: hasEmptyValue && Boolean(options.length),
    ...SelectProps,
  };

  const configSelect = {
    ...field,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    size: 'small',
    id: id || name,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <MuiTextField {...configSelect} SelectProps={selectProps}>
      {buildOptions}
    </MuiTextField>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasEmptyValue: PropTypes.bool,
  emptyStateMessage: PropTypes.string,
  SelectProps: PropTypes.object,
};

export default Select;
