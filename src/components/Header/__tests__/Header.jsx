import Header from '..';
const { renderWithRouter, screen, userEvent } = require('test-utils');

it('should redirect to home', () => {
  renderWithRouter(<Header />);
  userEvent.click(screen.getByAltText(/severino/i));
  expect(window.location.pathname).toBe('/');
});

it('should redirect to login', () => {
  renderWithRouter(<Header />);
  userEvent.click(screen.getByText(/login/i));
  expect(window.location.pathname).toBe('/login');
});

it('should redirect to sign-up', () => {
  renderWithRouter(<Header />);
  userEvent.click(screen.getByText(/cadastre-se/i));
  expect(window.location.pathname).toBe('/sign-up');
});
