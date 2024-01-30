import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleMap from './index.tsx';

const mockTurbines = [
  {
    id: 1,
    name: 'Turbine 1',
    farmId: 1,
    lat: 22.54992,
    lng: 0,
  },
];

describe('GoogleMap', () => {
  it('renders the GoogleMap component', () => {
    render(<GoogleMap turbines={mockTurbines} />);

    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });
});
