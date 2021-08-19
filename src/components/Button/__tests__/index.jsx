import { toMatchSnapshot } from 'test-utils';
import Button from '..';

it('should match snapshot', () => {
  toMatchSnapshot(<Button>Test button</Button>);
});
