import { homeRoutes } from 'routes/home';
import { toMatchSnapshot } from 'test-utils';
import UserProvider from 'commons/contexts/User';
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
