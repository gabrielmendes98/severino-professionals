/* eslint-disable func-names */
/* eslint-disable func-style */

import yup from 'commons/utils/yup';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const validations = yup.object().shape({
  currentPassword: yup.string().trim().min(6).required(),
  newPassword: yup.string().trim().min(6).required(),
  confirmNewPassword: yup
    .string()
    .trim()
    .min(6)
    .test('passwords-match', 'As senhas devem ser iguais', function (value) {
      return this.parent.newPassword === value;
    }),
});

export { initialValues, validations };
