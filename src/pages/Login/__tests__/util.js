import * as log from 'commons/utils/log';
import * as util from '../util';

it('should throw error when pass invalid provider', () => {
  const getToken = jest.spyOn(util, 'getToken');
  const throwError = jest.spyOn(log, 'throwError').mockImplementation(jest.fn);

  getToken('mock response', 'INVALID_PROVIDER');
  expect(throwError).toHaveBeenCalledWith('Provider não encontrado');
});
