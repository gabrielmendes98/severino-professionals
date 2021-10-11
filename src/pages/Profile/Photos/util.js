import yup from 'commons/utils/yup';

export const initialValues = {
  file: '',
  title: '',
};

export const validations = yup.object().shape({
  file: yup.string().trim().required('Escolha uma foto'),
});
