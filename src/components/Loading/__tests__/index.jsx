import { toMatchSnapshot } from 'test-utils';
import Loading from '../index';

it('should match snapshot normal', () => {
  toMatchSnapshot(<Loading />);
});

it('should match snapshot full screen', () => {
  toMatchSnapshot(<Loading fullScreen />);
});
