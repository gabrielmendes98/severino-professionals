import { renderWithRouter, userEvent, screen, waitFor } from 'test-utils';
import { getToken, removeToken } from 'commons/utils/storage';
import PAGE_URL from 'commons/constants/routes';
import UserProvider from 'commons/contexts/User';
import SignUp from '..';

it('should signup, login and redirect user to profile page', async () => {
  renderWithRouter(
    <UserProvider>
      <SignUp />
    </UserProvider>,
    { route: PAGE_URL.SIGN_UP },
  );
  removeToken();

  userEvent.type(screen.getByLabelText(/e-mail/i), 'test@test.com');
  userEvent.type(screen.getByLabelText('Nome *', { exact: true }), 'test');
  userEvent.type(screen.getByLabelText(/sobrenome/i), 'da silva');
  userEvent.type(
    screen.getByLabelText(/celular com whatsapp, de preferência/i),
    '34999999999',
  );
  userEvent.click(screen.getByLabelText(/estado/i));
  userEvent.click(await screen.findByText(/mg/i));
  userEvent.click(screen.getByLabelText(/cidade/i));
  userEvent.click(await screen.findByText(/Abadia dos Dourados/i));
  userEvent.type(screen.getByLabelText('Senha *'), '123123');
  userEvent.type(screen.getByLabelText(/confirmar senha/i), '123123');
  userEvent.click(screen.getByRole('button', { name: /finalizar/i }));

  await waitFor(() => expect(getToken()).toBeTruthy());
  expect(window.location.pathname).toBe(PAGE_URL.PROFILE);
});
