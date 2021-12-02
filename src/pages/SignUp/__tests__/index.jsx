import 'test-utils/mocks/material-ui/select';
import { renderWithRouter, userEvent, screen, waitFor } from 'test-utils';
import session from 'services/mocks/data/session';
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
