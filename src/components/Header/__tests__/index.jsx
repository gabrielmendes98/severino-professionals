import { renderWithRouter, screen, userEvent } from 'test-utils';
import { homeRoutes } from 'routes/home';
import PAGE_URL from 'commons/constants/routes';
import UserProvider, { UserContext } from 'commons/contexts/User';
import { getToken } from 'commons/utils/storage';
import Header from '..';

it('should redirect to home', () => {
  renderWithRouter(
    <UserProvider>
      <Header />
    </UserProvider>,
  );
  userEvent.click(screen.getByAltText(/severino/i));
  expect(window.location.pathname).toBe(homeRoutes.main);
});

describe('when user is not signed', () => {
  beforeEach(() => {
    renderWithRouter(
      <UserContext.Provider value={{ signed: false }}>
        <Header />
      </UserContext.Provider>,
    );
  });

  it('should redirect to login', () => {
    userEvent.click(screen.getByText(/login/i));
    expect(window.location.pathname).toBe(PAGE_URL.LOGIN);
  });

  it('should redirect to sign-up', () => {
    userEvent.click(screen.getByText(/cadastre-se/i));
    expect(window.location.pathname).toBe(PAGE_URL.SIGN_UP);
  });
});

describe('when user is signed', () => {
  beforeEach(() => {
    renderWithRouter(
      <UserContext.Provider value={{ signed: true }}>
        <Header />
      </UserContext.Provider>,
    );
  });

  it('should redirect to profile', () => {
    userEvent.click(screen.getByText(/perfil/i));
    expect(window.location.pathname).toBe(PAGE_URL.PROFILE);
  });

  it('should sign-out', () => {
    userEvent.click(screen.getByText(/sair/i));
    expect(getToken()).toBeFalsy();
  });
});
