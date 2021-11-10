import { toMatchSnapshot } from 'test-utils';
import UserProvider from 'commons/contexts/User';
import Layout from '..';

it('should match snapshot', () => {
  toMatchSnapshot(
    <UserProvider>
      <Layout>
        <div>Test</div>
      </Layout>
    </UserProvider>,
    { useRouter: true },
  );
});
