/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

const Select = jest.mock('components/Form/Select', props => (
  <>
    <label htmlFor={props.id || props.name}>{props.label}</label>
    <input
      onChange={e => {
        props.onChange(e.target.value);
      }}
      id={props.id || props.name}
      name={props.name}
      value={props.value || ''}
    />
  </>
));

export default Select;
