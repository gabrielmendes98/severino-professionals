import * as routes from 'routes';
import { renderWithRouter, screen, toMatchSnapshot, waitFor } from 'test-utils';
import UserProvider from 'commons/contexts/User';
import { removeToken } from 'commons/utils/storage';
import PAGE_URL from 'commons/constants/routes';
import Main from '..';

beforeEach(() => {
  jest.restoreAllMocks();
});

it('should match snapshot', () => {
  window.history.pushState({}, 'Test page', PAGE_URL.HOME);
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

it('should use div as default layout', () => {
  const defaultRoutes = [...routes.default];

  routes.default = [
    {
      path: '/test',
      exact: true,
      // eslint-disable-next-line react/display-name
      component: () => <div id="test-component">Test Component</div>,
    },
  ];

  renderWithRouter(
    <UserProvider>
      <Main />
    </UserProvider>,
    { route: '/test' },
  );

  expect(screen.getByTestId('layout')).toBeInTheDocument();
  expect(screen.getByTestId('test-component')).toBeInTheDocument();

  routes.default = defaultRoutes;
});
