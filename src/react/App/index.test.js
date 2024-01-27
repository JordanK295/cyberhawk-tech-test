import { render, screen } from '@testing-library/react';
import App from '.';
import '@testing-library/jest-dom';

describe('loads and displays greeting', () => {
  it('renders the dashboard text', () => {
    render(<App />);

    const linkElement = screen.getByText(/dashboard/i);
    expect(linkElement).toBeInTheDocument();
  });
});
