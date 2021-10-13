import yup from 'commons/utils/yup';

export const initialValues = {
  name: '',
};

export const validations = yup.object().shape({
  name: yup.string().trim().required(),
});
