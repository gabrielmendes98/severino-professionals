import { homeRoutes } from 'routes/home';
import { renderWithRouter, screen, toMatchSnapshot, waitFor } from 'test-utils';
import UserProvider from 'commons/contexts/User';
import { removeToken } from 'commons/utils/storage';
import PAGE_URL from 'commons/constants/routes';
import Main from '..';

it('should match snapshot', () => {
  window.history.pushState({}, 'Test page', homeRoutes.main);
  toMatchSnapshot(
    <UserProvider>
      <Main />
    </UserProvider>,
    { useRouter: true },
  );
});

it('should redirect if user is not logged in', async () => {
  removeToken();

  renderWithRouter(
    <UserProvider>
      <Main />
    </UserProvider>,
    { route: PAGE_URL.PROFILE },
  );

  await waitFor(() => {
    expect(window.location.pathname).toBe(PAGE_URL.LOGIN);
  });
});

it('should display found page if not found url', async () => {
  renderWithRouter(
    <UserProvider>
      <Main />
    </UserProvider>,
    { route: '/FAKE-INVALID-ROUTE' },
  );

  expect(await screen.findByText(/página não encontrada/i)).toBeInTheDocument();
});
