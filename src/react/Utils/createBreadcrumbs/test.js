import { useLocation } from 'react-router-dom';
import createBreadcrumbs from './index.tsx';

const mockFarms = [
  { id: 1, name: 'Farm 1' },
  { id: 2, name: 'Farm 2' },
];

const mockTurbines = [
  { id: 1, name: 'Turbine 1' },
  { id: 2, name: 'Turbine 2' },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({
    pathname: '',
  })),
}));

describe('createBreadcrumbs', () => {
  it('should return an empty array when there are no path segments', () => {
    expect(createBreadcrumbs(mockFarms, mockTurbines)).toEqual([]);
  });

  it('should create breadcrumbs for "Farms" when the path is "/farms"', () => {
    useLocation.mockReturnValue({
      pathname: '/farms',
    });

    expect(createBreadcrumbs(mockFarms, mockTurbines)).toEqual([{ type: 'farms', title: 'Farms' }]);
  });

  it('should create breadcrumbs for a specific farm when the path is "/farm/:farmId"', () => {
    useLocation.mockReturnValue({
      pathname: '/farm/1',
    });

    expect(createBreadcrumbs(mockFarms, mockTurbines)).toEqual([
      { type: 'farms', title: 'Farms' },
      { type: 'farm', farmId: 1, title: 'Farm 1' },
    ]);
  });

  it('should create breadcrumbs for a specific turbine when the path is "/farm/:farmId/turbine/:turbineId"', () => {
    useLocation.mockReturnValue({
      pathname: '/farm/1/turbine/2',
    });

    expect(createBreadcrumbs(mockFarms, mockTurbines)).toEqual([
      { type: 'farms', title: 'Farms' },
      { type: 'farm', farmId: 1, title: 'Farm 1' },
      { type: 'turbine', farmId: 1, turbineId: 2, title: 'Turbine 2' },
    ]);
  });

  it('should return an empty array when the farm or turbine does not exist', () => {
    useLocation.mockReturnValue({
      pathname: '/farm/3/turbine/4',
    });

    expect(createBreadcrumbs(mockFarms, mockTurbines)).toEqual([]);
  });
});
