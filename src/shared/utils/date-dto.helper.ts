export function createOneWeekAgo() {
  const now = new Date();
  now.setDate(now.getDate() - 7);
  return now.toISOString();
}

export function createOneMonthLeter() {
  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  return now.toISOString();
}
