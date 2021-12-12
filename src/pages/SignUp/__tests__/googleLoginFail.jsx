import 'test-utils/mocks/google-login/fail';
import { renderWithRouter, screen, userEvent, waitFor } from 'test-utils';
import { toast } from 'react-toastify';
import ibgeApi from 'services/requests/ibge';
import UserProvider from 'commons/contexts/User';
import SignUp from '..';

it('should show error if fail login', async () => {
  jest
    .spyOn(ibgeApi, 'getStates')
    .mockImplementation(() => Promise.resolve([]));

  renderWithRouter(
    <UserProvider>
      <SignUp />
    </UserProvider>,
  );

  const toastError = jest.spyOn(toast, 'error');

  userEvent.click(screen.getByRole('button', { name: /entrar com google/i }));

  await waitFor(() => {
    expect(toastError).toHaveBeenCalledTimes(1);
  });
});
