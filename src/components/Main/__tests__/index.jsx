import { toMatchSnapshot } from 'test-utils';
import Main from '..';

it('should match snapshot', () => {
  toMatchSnapshot(
    <Main>
      <div>Test</div>
    </Main>,
    { useRouter: true },
  );
});
