import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from './index.tsx';

describe('<Breadcrumbs />', () => {
  it('should render the Farms link', () => {
    render(<Breadcrumbs crumbs={[{ title: 'Farms' }]} />);

    expect(screen.getByText('Farms')).toBeInTheDocument();
  });

  it('should render the second link with the correct text', () => {
    render(<Breadcrumbs crumbs={[{ title: 'Farms' }, { title: 'Farm 1', farmId: '1' }]} />);

    expect(screen.getByText('Farm 1')).toBeInTheDocument();
  });

  it('should render the third link with the correct text and aria-current="page"', () => {
    render(
      <Breadcrumbs
        crumbs={[
          { title: 'Farms' },
          { title: 'Farm 1', farmId: '1' },
          { title: 'Turbine 1', farmId: '1', turbineId: '1' },
        ]}
      />
    );

    expect(screen.getByText('Turbine 1', { selector: 'li[aria-current="page"]' })).toBeInTheDocument();
  });
});
