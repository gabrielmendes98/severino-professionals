import 'test-utils/mocks/google-login';
import { googleLoginSuccess } from 'test-utils/mocks/google-login/response';
import { renderWithRouter, screen, userEvent, waitFor } from 'test-utils';
import session from 'services/mocks/data/session';
import loginApi from 'services/requests/login';
import UserProvider from 'commons/contexts/User';
import { O_AUTH_PROVIDERS } from 'commons/constants';
import PAGE_URL from 'commons/constants/routes';
import { getToken } from 'commons/utils/storage';
import Login from '..';

beforeEach(() => {
  jest.resetModules();
});

it('should login and redirect to profile', async () => {
  renderWithRouter(
    <UserProvider>
      <Login />
    </UserProvider>,
  );

  userEvent.type(screen.getByLabelText(/e-mail/i), 'test@test.com');
  userEvent.type(screen.getByLabelText(/senha/i), '123123');
  userEvent.click(screen.getByRole('button', { name: /^entrar$/i }));

  await waitFor(() => expect(window.location.pathname).toBe(PAGE_URL.PROFILE));
  expect(getToken()).toBe(session.token);
});

it('should be able to login with google', async () => {
  renderWithRouter(
    <UserProvider>
      <Login />
    </UserProvider>,
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
