import yup from 'commons/utils/yup';

const initialValues = {
  email: '',
  password: '',
};

const validations = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().min(6).required(),
});

export { initialValues, validations };
