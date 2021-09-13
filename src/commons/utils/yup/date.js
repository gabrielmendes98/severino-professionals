/* eslint-disable complexity */
/* eslint-disable func-names */
/* eslint-disable func-style */
import moment from 'moment';
import yup from '.';

const INVALID_DATE_MESSAGE = 'Data inválida';

export function dateStartEndValidate(ref) {
  return this.test(
    'dateStartEndValidation',
    INVALID_DATE_MESSAGE,
    function (value = '') {
      const { path, createError } = this;

      let message = '';

      if (!value) return true;

      if (!moment(value).isValid) {
        message = INVALID_DATE_MESSAGE;
      }

      if (ref) {
        const refDate = this.resolve(yup.ref(ref));

        if (refDate) {
          const startDate = moment(refDate);
          const endDate = moment(value);

          const isValid = startDate.isValid() && endDate.isValid();

          if (isValid && !endDate.isAfter(startDate)) {
            message = 'Data deve ser posterior à data de início';
          }
        }
      }

      return message ? createError({ path, message }) : true;
    },
  );
}
