import 'test-utils/mocks/material-ui/select';
import 'test-utils/mocks/google-login';
import { renderWithRouter, userEvent, screen, waitFor } from 'test-utils';
import { googleLoginSuccess } from 'test-utils/mocks/google-login/response';
import session from 'services/mocks/data/session';
import loginApi from 'services/requests/login';
import ibgeApi from 'services/requests/ibge';
import { O_AUTH_PROVIDERS } from 'commons/constants';
import { getToken, removeToken } from 'commons/utils/storage';
import PAGE_URL from 'commons/constants/routes';
import UserProvider from 'commons/contexts/User';
import SignUp from '..';
import * as utils from '../util';

it('should signup, login and redirect user to profile page', async () => {
  const parseStateToSelect = jest.spyOn(utils, 'parseStateToSelect');
  const parseCityToSelect = jest.spyOn(utils, 'parseCityToSelect');
  renderWithRouter(
    <UserProvider>
      <SignUp />
    </UserProvider>,
    { route: PAGE_URL.SIGN_UP },
  );

  removeToken();

  userEvent.type(screen.getByLabelText(/e-mail/i), 'test@test.com');
  userEvent.type(screen.getByLabelText(/^nome/i), 'test');
  userEvent.type(screen.getByLabelText(/sobrenome/i), 'da silva');
  userEvent.type(
    screen.getByLabelText(/celular com whatsapp, de preferência/i),
    '34999999999',
  );
  await waitFor(() => {
    expect(parseStateToSelect).toHaveBeenCalledTimes(1);
  });
  userEvent.selectOptions(screen.getByLabelText(/estado/i), 'MG');
  await waitFor(() => {
    expect(parseCityToSelect).toHaveBeenCalledTimes(1);
  });
  userEvent.selectOptions(
    screen.getByLabelText(/cidade/i),
    'Abadia dos Dourados',
  );
  userEvent.type(screen.getByLabelText(/^senha/i), '123123');
  userEvent.type(screen.getByLabelText(/confirmar senha/i), '123123');
  userEvent.click(screen.getByRole('button', { name: /finalizar/i }));

  await waitFor(() => expect(window.location.pathname).toBe(PAGE_URL.PROFILE));
  expect(getToken()).toBe(session.token);
});

it('should be able to login with google', async () => {
  jest
    .spyOn(ibgeApi, 'getStates')
    .mockImplementation(() => Promise.resolve([]));

  renderWithRouter(
    <UserProvider>
      <SignUp />
    </UserProvider>,
    { route: PAGE_URL.SIGN_UP },
  );

  const oAuthLogin = jest.spyOn(loginApi, 'oAuthLogin');

  userEvent.click(screen.getByRole('button', { name: /entrar com google/i }));

  await waitFor(() => {
    expect(oAuthLogin).toHaveBeenCalledTimes(1);
  });
  expect(oAuthLogin).toHaveBeenCalledWith(
    googleLoginSuccess.tokenId,
    O_AUTH_PROVIDERS.GOOGLE,
  );

  await waitFor(() => expect(window.location.pathname).toBe(PAGE_URL.PROFILE));
  expect(getToken()).toBe(session.token);
});
