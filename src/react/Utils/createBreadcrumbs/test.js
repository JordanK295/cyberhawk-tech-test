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
  useLocation: jest.fn(),
}));

// Import the createBreadcrumbs function
const createBreadcrumbs = require('./path-to-createBreadcrumbs');

describe('createBreadcrumbs', () => {
  beforeEach(() => {
    // Mock useLocation to return a sample pathname
    jest.requireMock('react-router-dom').useLocation.mockReturnValue({ pathname: '/farm/1/turbine/2' });
  });

  it('should return the correct breadcrumbs for turbine page', () => {
    const result = createBreadcrumbs(mockFarms, mockTurbines);

    expect(result).toEqual([
      { type: 'farms', title: 'Farms' },
      { type: 'farm', farmId: 1, title: 'Farm 1' },
      { type: 'turbine', farmId: 1, turbineId: 2, title: 'Turbine 2' },
    ]);
  });

  it('should return the correct breadcrumbs for farm page', () => {
    jest.requireMock('react-router-dom').useLocation.mockReturnValue({ pathname: '/farm/1' });
    const result = createBreadcrumbs(mockFarms, mockTurbines);

    expect(result).toEqual([
      { type: 'farms', title: 'Farms' },
      { type: 'farm', farmId: 1, title: 'Farm 1' },
    ]);
  });

  it('should return the correct breadcrumbs for farms page', () => {
    jest.requireMock('react-router-dom').useLocation.mockReturnValue({ pathname: '/farms' });
    const result = createBreadcrumbs(mockFarms, mockTurbines);

    expect(result).toEqual([{ type: 'farms', title: 'Farms' }]);
  });

  it('should return an empty array for unknown paths', () => {
    jest.requireMock('react-router-dom').useLocation.mockReturnValue({ pathname: '/unknown/path' });
    const result = createBreadcrumbs(mockFarms, mockTurbines);

    expect(result).toEqual([]);
  });
});
