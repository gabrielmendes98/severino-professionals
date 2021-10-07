/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { useFormikContext } from 'formik';

const Select = jest.mock(
  'components/Form/Select',
  () =>
    ({ id, name, label, onChange, options }) => {
      const { setFieldValue, values } = useFormikContext();
      const handleChange = event => {
        if (onChange) {
          onChange(event, setFieldValue);
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
            value={values[name]}
            onChange={handleChange}
          >
            <option disabled defaultValue value>
              {label}
            </option>
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
