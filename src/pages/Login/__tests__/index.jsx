import { renderWithRouter, screen, userEvent, waitFor } from 'test-utils';
import UserProvider from 'commons/contexts/User';
import PAGE_URL from 'commons/constants/routes';
import Login from '..';

it('should login and redirect to profile', async () => {
  renderWithRouter(
    <UserProvider>
      <Login />
    </UserProvider>,
  );

  userEvent.type(screen.getByLabelText(/e-mail/i), 'test@test.com');
  userEvent.type(screen.getByLabelText(/senha/i), '123123');
  userEvent.click(screen.getByRole('button', { name: /entrar/i }));

  await waitFor(() => expect(window.location.pathname).toBe(PAGE_URL.PROFILE));
  expect(localStorage.getItem('token')).toBeTruthy();
});
