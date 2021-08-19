import { render, screen } from 'test-utils';
import NotFound from '..';

it('should renders', () => {
  render(<NotFound />);
  expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument();
});
