import PAGE_URL from 'commons/constants/routes';
import yup from 'commons/utils/yup';

const defaultRoute = PAGE_URL.PROFILE;
const blackList = [PAGE_URL.LOGIN];

const initialValues = {
  email: '',
  password: '',
};

const validations = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().min(6).required(),
});

const getRedirectRoute = location => {
  const route = location.state?.redirect || defaultRoute;

  return blackList.includes(route) ? defaultRoute : route;
};

export { initialValues, validations, getRedirectRoute };
