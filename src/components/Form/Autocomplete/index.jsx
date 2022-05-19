/* eslint-disable no-use-before-define */
import { useState, useCallback, useMemo, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';
import debounce from 'lodash.debounce';

const Autocomplete = ({
  name,
  id,
  options,
  onChange,
  setOptions,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);
  const configTextfield = {};

  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [inputValue, setInputValue] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onValueChange = useMemo(() => debounce(onChange, 500), []);

  const onInputChange = useCallback(
    (e, value, reason) => {
      if (reason === 'input') {
        setInputValue(value);
      }
      if (!value) {
        setOpen(false);
        return;
      }
      setOpen(true);

      onValueChange(value);
    },
    [onValueChange],
  );

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  useEffect(
    () => () => {
      onValueChange.cancel();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <MuiAutocomplete
      value={field.value || ''}
      onChange={(event, newValue) => {
        helpers.setValue(newValue?.value);
        setInputValue(newValue?.label);
        setSelectedLabel(newValue?.label);
      }}
      inputValue={inputValue || ''}
      id={id || name}
      freeSolo
      open={open}
      onBlur={() => {
        setOpen(false);
        if (selectedLabel !== inputValue) {
          setInputValue(selectedLabel);
        }
      }}
      onClose={() => {
        setOptions([]);
      }}
      getOptionLabel={option => option.label || ''}
      onInputChange={onInputChange}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          {...configTextfield}
          onBlur={field.onBlur}
          name={name}
          variant="outlined"
          size="small"
          {...otherProps}
        />
      )}
    />
  );
};

Autocomplete.defaultProps = {
  options: [],
};

Autocomplete.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ),
  onChange: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
};

export default Autocomplete;
