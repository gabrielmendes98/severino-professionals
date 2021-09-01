/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import MenuItem from '@material-ui/core/MenuItem';

export const getOptions = (options, hasEmptyValue, emptyStateMessage) => {
  if (options.length) {
    return hasEmptyValue ? [{ label: '', value: '' }, ...options] : options;
  }
  return [
    {
      label: emptyStateMessage || 'Não há opções',
      value: '',
      disabled: true,
    },
  ];
};

export const renderOption = name => (props, index) => {
  const { label, value } = props;

  return (
    <MenuItem
      id={`${name}-option-${index}`}
      value={value}
      key={value}
      alt={label}
      {...props}
    >
      {label}
    </MenuItem>
  );
};
