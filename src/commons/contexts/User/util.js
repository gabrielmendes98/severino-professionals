import { O_AUTH_PROVIDERS } from 'commons/constants';
import { throwError } from 'commons/utils/log';

const getOAuthToken = (response, provider) => {
  switch (provider) {
    case O_AUTH_PROVIDERS.GOOGLE:
      return response.tokenId;
    default:
      return throwError('Provider não encontrado');
  }
};

export { getOAuthToken };
