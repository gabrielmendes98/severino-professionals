export const filterNotNums = (value = '') => String(value).replace(/\D/g, '');

export const filterNotAlphanumeric = (value = '') =>
  String(value).replace(/\W+/g, '');

const mask = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  phone: '(99) 99999-9999',
  zipCode: '99999-999',
  number: '9.999.999',
  date: '99/99/9999',
  cpfCnpj: (value = '') =>
    filterNotNums(value).length <= 11
      ? '999.999.999-999999'
      : '99.999.999/9999-99',
};

export const getMask = (format, value) => {
  const selectedMask = mask[format] || format;

  return typeof selectedMask === 'function'
    ? selectedMask(value)
    : selectedMask;
};

export const formats = {
  9: '[0-9]',
  t: '[a-zà-úA-ZÀ-Ú]',
  A: '[a-zA-Z0-9]',
  '?': '[a-zà-úA-ZÀ-Ú0-9]',
};
