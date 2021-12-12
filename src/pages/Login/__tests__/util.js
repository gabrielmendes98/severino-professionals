import * as log from 'commons/utils/log';
import * as util from 'commons/contexts/User/util';

it('should throw error when pass invalid provider', () => {
  const getOAuthToken = jest.spyOn(util, 'getOAuthToken');
  const throwError = jest.spyOn(log, 'throwError').mockImplementation(jest.fn);

  getOAuthToken('mock response', 'INVALID_PROVIDER');
  expect(throwError).toHaveBeenCalledWith('Provider não encontrado');
});
