export default jest.mock('react-google-login', () => {
  const GoogleLogin = ({ onFailure, buttonText }) => {
    const handleClick = () => {
      onFailure();
    };

    return (
      <button onClick={handleClick} type="button">
        {buttonText}
      </button>
    );
  };

  return GoogleLogin;
});
