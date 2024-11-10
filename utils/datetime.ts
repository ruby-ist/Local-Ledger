export function monthTimestamps(monthString: string): [number, number] {
  const [year, month] = monthString.split('-').map(Number);
  return [
    new Date(year, month - 1, 1).getTime(),
    new Date(year, month, 0).setHours(23, 59, 59, 999),
  ];
}

export function formatDateToMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const currentMonth = formatDateToMonth(new Date());

const records = await db.logs.orderBy('createdAt').limit(1).toArray();
const oldestLog = records[0];
export const minimumMonth = oldestLog
  ? formatDateToMonth(new Date(oldestLog.createdAt))
  : currentMonth;
