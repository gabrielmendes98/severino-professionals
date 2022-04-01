/* eslint-disable func-names */
/* eslint-disable func-style */

import yup from 'commons/utils/yup';

const initialValues = {
  email: '',
  name: '',
  lastName: '',
  phone: '',
  hasWhatsapp: false,
  state: '',
  city: '',
  password: '',
  confirmPassword: '',
};

const validations = yup.object().shape({
  email: yup.string().trim().email().required(),
  name: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  phone: yup.string().trim().phone().required(),
  state: yup.string().trim().required(),
  city: yup.string().trim().required(),
  password: yup.string().trim().min(6).required(),
  confirmPassword: yup
    .string()
    .trim()
    .min(6)
    .test('passwords-match', 'As senhas devem ser iguais', function (value) {
      return this.parent.password === value;
    }),
});

const parseDataToService = values => {
  const { name, lastName, state, ...other } = values;

  return {
    ...other,
    name: `${name} ${lastName}`,
  };
};

export { initialValues, validations, parseDataToService };
