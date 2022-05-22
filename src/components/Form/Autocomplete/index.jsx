/* eslint-disable no-use-before-define */
import { useState, useCallback, useMemo, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';
import debounce from 'lodash.debounce';

const Autocomplete = ({ name, id, options, onChange, ...otherProps }) => {
  const [field, meta, helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const [prevSelectedLabel, setPrevSelectedLabel] = useState('');
  const [inputValue, setInputValue] = useState('');

  const configTextfield = {};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceValueChange = useMemo(() => debounce(onChange, 500), []);

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

      debounceValueChange(value);
    },
    [debounceValueChange],
  );

  const onValueChange = (event, newValue) => {
    helpers.setValue(newValue?.value);
    setInputValue(newValue?.label);
    setPrevSelectedLabel(newValue?.label);
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  const getOptionLabel = option => option.label || '';

  const onBlur = () => {
    setOpen(false);
    if (prevSelectedLabel !== inputValue) {
      setInputValue(prevSelectedLabel);
    }
  };
  // need this to clear input value on form reset
  useEffect(() => {
    if (!field.value) {
      setInputValue('');
    }
  }, [field.value]);

  useEffect(
    () => () => {
      debounceValueChange.cancel();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <MuiAutocomplete
      freeSolo
      id={id || name}
      value={field.value || ''}
      onChange={onValueChange}
      inputValue={inputValue || ''}
      onInputChange={onInputChange}
      open={open}
      onBlur={onBlur}
      getOptionLabel={getOptionLabel}
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
};

export default Autocomplete;
