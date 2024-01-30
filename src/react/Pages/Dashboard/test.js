import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
import FarmsDashboard from './FarmsDashboard';

jest.mock('axios');

describe('FarmsDashboard', () => {
  const mockedAxios = mocked(axios);

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Farm 1',
          numberOfTurbines: 10,
          oldestInspection: '2022-01-01',
          averageGrade: 4.5,
        },
      ],
    });
  });

  it('should render a table with the farms data', async () => {
    render(<FarmsDashboard />);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Farm 1')).toBeInTheDocument();
    });
  });
});