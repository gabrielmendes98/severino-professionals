export const parseStateToSelect = states =>
  states.map(state => ({ value: state.id, label: state.name }));

export const parseCityToSelect = cities =>
  cities.map(city => ({ label: city.name, value: city.id }));

export const parseToSelect = (options, labelMapper, valueMapper) =>
  options.map(option => ({
    label: option[labelMapper],
    value: option[valueMapper],
  }));
