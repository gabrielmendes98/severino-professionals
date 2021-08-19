import { toMatchSnapshot } from 'test-utils';
import Text from '..';

it('should match snapshot', () => {
  toMatchSnapshot(
    <Text size={0.8} margin={{ top: 2, bottom: 2 }} required uppercase>
      Test Text
    </Text>,
  );
});
