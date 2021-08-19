import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, toMatchSnapshot, screen, userEvent } from 'test-utils';
import AppBrand from '..';

it('should match snapshot', () => {
  toMatchSnapshot(<AppBrand />, { useRouter: true });
});

it('should redirect to home', () => {
  const history = createMemoryHistory();
  history.push('/some/bad/route');
  render(
    <Router history={history}>
      <AppBrand />
    </Router>,
  );

  userEvent.click(screen.getByAltText(/severino/i));
  expect(history.location.pathname).toBe('/');
});
