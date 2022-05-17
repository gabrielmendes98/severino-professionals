import yup from 'commons/utils/yup';

export const initialValues = {
  serviceId: '',
};

export const validations = yup.object().shape({
  serviceId: yup.string().trim().required(),
});
