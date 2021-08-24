/* eslint-disable func-names */
/* eslint-disable func-style */

import DDDs from 'commons/constants/ddd';
import { filterNotNums } from '../mask';

const hasValidDDD = phone => DDDs.includes(phone.substring(0, 2));

const isValidPhone = maskedValue => {
  const value = filterNotNums(maskedValue);

  const length = 11;

  let message = '';

  if (!value) return true;

  if (value.length < length) {
    message = `Deve ter no mínimo ${length} dígitos`;
  } else if (!hasValidDDD(value)) {
    message = 'DDD inválido';
  }

  if (message) {
    return { message };
  }

  return true;
};

function phoneValidate() {
  return this.test(
    'phoneValidation',
    'Telefone inválido',
    function (maskedValue = '') {
      const { path, createError } = this;

      const isValid = isValidPhone(maskedValue);

      if (typeof isValid === 'object') {
        return createError({
          ...isValid,
          path,
        });
      }

      return true;
    },
  );
}

export { phoneValidate };
