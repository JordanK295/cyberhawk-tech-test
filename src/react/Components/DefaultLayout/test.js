import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import DefaultLayout from './index.tsx';

const mock = new MockAdapter(axios);

const mockFarms = [
  { id: 1, name: 'Farm 1' },
  { id: 2, name: 'Farm 2' },
];

const mockTurbines = [
  { id: 1, name: 'Turbine 1' },
  { id: 2, name: 'Turbine 2' },
];

mock.onGet('http://localhost:8080/api/farms').reply(200, mockFarms);
mock.onGet('http://localhost:8080/api/farms/1/turbines').reply(200, mockTurbines);

describe('DefaultLayout', () => {
  it('renders the layout with breadcrumbs and print button', async () => {
    render(
      <MemoryRouter initialEntries={['/farm/1/turbine/2']}>
        <DefaultLayout />
      </MemoryRouter>
    );

    await screen.findByText('Farm 1');
    await screen.findByText('Turbine 2');

    expect(screen.getByLabelText('print')).toBeInTheDocument();
  });

  it('renders the layout without farms and turbines when not on turbine page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <DefaultLayout />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.queryByText('Farm 1')).toBeNull());
    await waitFor(() => expect(screen.queryByText('Turbine 2')).toBeNull());

    expect(screen.getByLabelText('print')).toBeInTheDocument();
  });

  it('handles API errors and logs them to the console', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mock.onGet('http://localhost:8080/api/farms').reply(500);

    render(
      <MemoryRouter initialEntries={['/']}>
        <DefaultLayout />
      </MemoryRouter>
    );

    await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalledTimes(1));

    expect(screen.getByLabelText('print')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
