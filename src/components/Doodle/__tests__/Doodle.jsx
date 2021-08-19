import { toMatchSnapshot } from 'test-utils';
import Doodle from '..';

it('should match snapshot', () => {
  toMatchSnapshot(<Doodle size={2} />);
});
