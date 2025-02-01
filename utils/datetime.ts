export function monthTimestamps(monthString: string): [number, number] {
  const [year, month] = monthString.split('-').map(Number);
  return [
    new Date(year, month - 1, 1).getTime(),
    new Date(year, month, 0).setHours(23, 59, 59, 999),
  ];
}

export function formatTimeToMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export function formatTimeToDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const currentMonth = formatTimeToMonth(new Date());
export const currentDate = formatTimeToDate(new Date());

export function formatDateForDatetimePicker(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function convertToEpochTime(datetimeStr: string): number {
  const formattedStr = datetimeStr.replace('T', ' ');
  const date = new Date(formattedStr);

  return date.getTime();
}

export function formatMonthToHumanReadable(month: string): string {
  const [year, monthNum] = month.split('-');
  const monthName = new Date(Number(year), Number(monthNum) - 1).toLocaleString('default', { month: 'long' });
  return `${monthName} ${year}`;
}

const records = await db.logs.orderBy('createdAt').limit(1).toArray();
const oldestLog = records[0];
export const minimumMonth = oldestLog
  ? formatTimeToMonth(new Date(oldestLog.createdAt))
  : currentMonth;
// if min and max value are same in month picker, it will not respect those values.
export const miniminDate = oldestLog
  ? formatTimeToDate(new Date(oldestLog.createdAt))
  : undefined;

const [startDateTime, _] = monthTimestamps(currentMonth);
export const currentMonthStartDate = formatTimeToDate(new Date(startDateTime));
