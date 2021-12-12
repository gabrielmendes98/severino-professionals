import { toMatchSnapshot } from 'test-utils';
import GoogleLoginButton from '../Button';

it('should match snapshot', () => {
  toMatchSnapshot(
    <GoogleLoginButton
      handleOAuthFailure={jest.fn}
      handleOAuthLogin={jest.fn}
    />,
  );
});
