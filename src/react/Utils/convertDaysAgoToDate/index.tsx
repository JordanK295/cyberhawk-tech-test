const convertDaysAgoToDate = (daysAgoString: string): string => {
  const currentDate = new Date();
  const daysAgo = parseInt(daysAgoString, 10);

  if (Number.isNaN(daysAgo)) {
    return 'Invalid input';
  }

  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() - daysAgo);

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return targetDate.toLocaleDateString('en-US', options);
};

export default convertDaysAgoToDate;
