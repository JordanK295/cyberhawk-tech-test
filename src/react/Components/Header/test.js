import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './index.tsx';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockFarms = [
  { id: 1, name: 'Farm 1' },
  { id: 2, name: 'Farm 2' },
];

describe('Header', () => {
  it('renders the header component with Breeze logo and search input', () => {
    render(<Header farms={mockFarms} />);

    expect(screen.getByAltText('breeze logo')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Search Farms')).toBeInTheDocument();
  });
});
