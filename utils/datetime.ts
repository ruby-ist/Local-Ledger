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

const records = await db.logs.orderBy('createdAt').limit(1).toArray();
const oldestLog = records[0];
export const minimumMonth = oldestLog
  ? formatDateToMonth(new Date(oldestLog.createdAt))
  : currentMonth;
