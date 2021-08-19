import { renderWithRouter, screen, userEvent } from 'test-utils';
import PAGE_URL from 'commons/constants/routes';
import Home from '../index';

it('should redirect to sign-up on click', () => {
  renderWithRouter(<Home />, { route: PAGE_URL.HOME });
  userEvent.click(screen.getByRole('button', { name: /cadastre-se/i }));
  expect(window.location.pathname).toBe(PAGE_URL.SIGN_UP);
});
