import {
  toMatchSnapshot,
  renderWithRouter,
  userEvent,
  screen,
} from 'test-utils';
import PAGE_URL from 'commons/constants/routes';
import { SEVERINO_CLIENTS_WEBSITE, SEVERINO_EMAIL } from 'commons/constants';
import Footer from '..';

it('should match snapshot', () => {
  toMatchSnapshot(<Footer />, { useRouter: true });
});

describe('should redirect to:', () => {
  beforeEach(() => {
    renderWithRouter(<Footer />);
  });

  it('about-us', () => {
    userEvent.click(screen.getByRole('link', { name: /sobre nós/i }));
    expect(window.location.pathname).toBe(PAGE_URL.ABOUT_US);
  });

  it('terms-and-condition', () => {
    userEvent.click(screen.getByRole('link', { name: /termos e condições/i }));
    expect(window.location.pathname).toBe(PAGE_URL.TERMS_AND_CONDITIONS);
  });
});

describe('link should have attribute:', () => {
  beforeEach(() => {
    renderWithRouter(<Footer />);
  });

  it('client website', () => {
    expect(
      screen.getByRole('link', { name: /site dos clientes/i }),
    ).toHaveAttribute('href', SEVERINO_CLIENTS_WEBSITE);
  });

  it('email', () => {
    expect(screen.getByRole('link', { name: SEVERINO_EMAIL })).toHaveAttribute(
      'href',
      `mailto:${SEVERINO_EMAIL}`,
    );
  });
});
