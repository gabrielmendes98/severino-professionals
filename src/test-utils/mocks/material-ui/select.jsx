/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { useFormikContext } from 'formik';

const Select = jest.mock(
  'components/Form/Select',
  () =>
    ({ id, name, label, value, onChange, options }) => {
      const { setFieldValue } = useFormikContext();
      const handleChange = event => {
        if (onChange) {
          onChange(event);
          return;
        }
        setFieldValue(name, event.target.value);
      };

      return (
        <>
          <label htmlFor={id || name}>{label}</label>
          <select
            id={id || name}
            name={name}
            value={value}
            onChange={handleChange}
          >
            {options?.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </>
      );
    },
);

export default Select;
