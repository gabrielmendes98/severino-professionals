import { render, screen } from '@testing-library/react';
import Home from '../index';

it('should render hello message', () => {
  render(<Home />);
  const message = screen.getByText(/hello from home/i, { exact: false });
  expect(message).toBeInTheDocument();
});
