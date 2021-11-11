import { renderWithRouter, screen } from 'test-utils';
import NotFound from '..';

it('should renders', () => {
  renderWithRouter(<NotFound />);
  expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument();
});
