import convertDaysAgoToDate from './index.tsx';

describe('convertDaysAgoToDate', () => {
  it('should handle non-numeric input gracefully', () => {
    const result = convertDaysAgoToDate('invalid input');
    expect(result).toBe('Invalid input');
  });
});
