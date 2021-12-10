import { googleLoginSuccess } from './response';

export default jest.mock('react-google-login', () => {
  const GoogleLogin = ({ onSuccess, buttonText }) => {
    const handleClick = () => {
      onSuccess(googleLoginSuccess);
    };

    return (
      <button onClick={handleClick} type="button">
        {buttonText}
      </button>
    );
  };

  return GoogleLogin;
});
