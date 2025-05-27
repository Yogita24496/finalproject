import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Weather Forecast title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Weather Forecast/i);
  expect(titleElement).toBeInTheDocument();
});
