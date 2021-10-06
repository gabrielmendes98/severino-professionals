import { renderWithRouter, userEvent, screen, waitFor } from 'test-utils';
import session from 'services/mocks/data/session';
import UserProvider from 'commons/contexts/User';
import PAGE_URL from 'commons/constants/routes';
import { setToken } from 'commons/utils/storage';
import ChangePassword from '..';

it('should change password and redirect to profile', async () => {
  setToken(session.token);

  renderWithRouter(
    <UserProvider>
      <ChangePassword />
    </UserProvider>,
  );

  userEvent.type(screen.getByLabelText(/senha atual/i), '123213');
  userEvent.type(screen.getByLabelText(/^nova senha$/i), '123456');
  userEvent.type(screen.getByLabelText(/confirmar nova senha/i), '123456');
  userEvent.click(screen.getByRole('button', { name: /confirmar/i }));

  expect(
    await screen.findByText(/Senha trocada com sucesso!/i),
  ).toBeInTheDocument();
  await waitFor(() => expect(window.location.pathname).toBe(PAGE_URL.PROFILE));
});
