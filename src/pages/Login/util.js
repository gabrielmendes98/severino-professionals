import PAGE_URL from 'commons/constants/routes';
import yup from 'commons/utils/yup';

const defaultRoute = PAGE_URL.PROFILE;

const initialValues = {
  email: '',
  password: '',
};

const validations = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().min(6).required(),
});

const getRedirectRoute = location => location.state?.redirect || defaultRoute;

export { initialValues, validations, getRedirectRoute };
