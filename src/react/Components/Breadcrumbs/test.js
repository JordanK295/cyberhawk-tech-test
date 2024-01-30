import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from './index.tsx';
import '@testing-library/jest-dom';

describe('Breadcrumbs', () => {
  it('renders no breadcrumbs when crumbs prop is empty', () => {
    render(<Breadcrumbs crumbs={[]} />);
    expect(screen.queryByTestId('breadcrumb')).toBeNull();
  });

  it('renders "Farms" breadcrumb when crumbs prop has one element', () => {
    const crumbs = [{ type: 'farms', title: 'Farms' }];
    render(<Breadcrumbs crumbs={crumbs} />);
    expect(screen.getByText('Farms')).toBeInTheDocument();
  });

  it('renders "Farms" and farm breadcrumb when crumbs prop has two elements', () => {
    const crumbs = [
      { type: 'farms', title: 'Farms' },
      { type: 'farm', farmId: 1, title: 'Farm 1' },
    ];
    render(<Breadcrumbs crumbs={crumbs} />);
    expect(screen.getByText('Farms')).toBeInTheDocument();
    expect(screen.getByText('Farm 1')).toBeInTheDocument();
  });

  it('renders "Farms", farm, and turbine breadcrumbs when crumbs prop has three elements', () => {
    const crumbs = [
      { type: 'farms', title: 'Farms' },
      { type: 'farm', farmId: 1, title: 'Farm 1' },
      { type: 'turbine', farmId: 1, turbineId: 2, title: 'Turbine 2' },
    ];
    render(<Breadcrumbs crumbs={crumbs} />);
    expect(screen.getByText('Farms')).toBeInTheDocument();
    expect(screen.getByText('Farm 1')).toBeInTheDocument();
    expect(screen.getByText('Turbine 2')).toBeInTheDocument();
  });
});
