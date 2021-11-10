/* eslint-disable func-names */
/* eslint-disable func-style */

import workersApi from 'services/requests/workers';
import yup from 'commons/utils/yup';

const initialValues = {
  name: '',
  lastName: '',
  email: '',
  description: '',
  phone: '',
  state: '',
  city: '',
  hasWhatsapp: false,
};

const validations = yup.object().shape({
  name: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phone: yup.string().trim().phone().required(),
  state: yup.string().trim().required(),
  city: yup.string().trim().required(),
});

const parseStateToSelect = states =>
  states.map(state => ({ value: state.sigla, label: state.sigla }));

const parseCityToSelect = cities =>
  cities.map(city => ({ label: city.nome, value: city.nome }));

const parseDataToService = values => {
  const { name, lastName, ...other } = values;

  return {
    ...other,
    name: `${name} ${lastName}`,
  };
};

const parseUserToForm = user => {
  const { name, avatarUrl, ...other } = user;

  const firstOccurrence = name.indexOf(' ');
  const [firstName, lastName] = [
    name.slice(0, firstOccurrence),
    name.slice(firstOccurrence + 1),
  ];

  return {
    userData: {
      ...other,
      name: firstName,
      lastName,
      description: other.description ?? initialValues.description,
    },
    avatar: {
      url: avatarUrl,
      file: undefined,
      editing: false,
    },
  };
};

const saveUserData = (values, userId) =>
  workersApi.update(userId, parseDataToService(values));

export {
  initialValues,
  validations,
  parseStateToSelect,
  parseCityToSelect,
  parseUserToForm,
  saveUserData,
};
