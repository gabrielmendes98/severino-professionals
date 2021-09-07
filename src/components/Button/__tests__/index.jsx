import { toMatchSnapshot } from 'test-utils';
import Button from '..';

it('should match snapshot', () => {
  toMatchSnapshot(<Button>Test button</Button>);
});

it('should match snapshot with custom color', () => {
  toMatchSnapshot(<Button color="red">Test button</Button>);
});
