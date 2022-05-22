import * as yup from 'yup';
import { dateStartEndValidate } from './date';
import { phoneValidate } from './phone';

const validationMessages = {
  mixed: {
    default: 'Campo Inválido',
    required: 'Campo Obrigatório',
  },
  string: {
    email: 'E-mail Inválido',
    min: 'Campo inválido (mínimo ${min} caracteres)',
    max: 'Campo inválido (máximo ${max} caracteres)',
    length: 'Campo inválido (deve ter ${length} caracteres)',
  },
};

yup.setLocale(validationMessages);

yup.addMethod(yup.string, 'phone', phoneValidate);
yup.addMethod(yup.string, 'dateStartEnd', dateStartEndValidate);

export { validationMessages };
export default yup;
