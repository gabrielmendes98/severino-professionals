import 'test-utils/mocks/google-login/fail';
import { renderWithRouter, screen, userEvent } from 'test-utils';
import { toast } from 'react-toastify';
import UserProvider from 'commons/contexts/User';
import Login from '..';

it('should show error if fail login', async () => {
  renderWithRouter(
    <UserProvider>
      <Login />
    </UserProvider>,
  );

  const toastError = jest.spyOn(toast, 'error');

  userEvent.click(screen.getByRole('button', { name: /entrar com google/i }));

  expect(toastError).toHaveBeenCalledTimes(1);
});
