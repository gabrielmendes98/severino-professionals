import { O_AUTH_PROVIDERS } from 'commons/constants';
import PAGE_URL from 'commons/constants/routes';
import { throwError } from 'commons/utils/log';
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

const getToken = (response, provider) => {
  switch (provider) {
    case O_AUTH_PROVIDERS.GOOGLE:
      return response.tokenId;
    default:
      return throwError('Provider não encontrado');
  }
};

export { initialValues, validations, getRedirectRoute, getToken };
