import { toMatchSnapshot } from 'test-utils';
import { Grid } from '..';

it('Styled Grid should match snapshot', () => {
  toMatchSnapshot(<Grid margin={{ bottom: 2 }} padding={{ top: 2 }}></Grid>);
});
