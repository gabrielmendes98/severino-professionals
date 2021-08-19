import { renderWithRouter, screen, userEvent } from 'test-utils';
import Home from '../index';

it('should redirect to sign-up on click', () => {
  renderWithRouter(<Home />, { route: '/' });
  userEvent.click(screen.getByRole('button', { name: /cadastre-se/i }));
  expect(window.location.pathname).toBe('/sign-up');
});
