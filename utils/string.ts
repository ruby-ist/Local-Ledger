export function truncateMiddle(input: string, maxLength: number, visibleEnd: number) {
  if (input.length <= maxLength) return input;
  const visibleStartLength = maxLength - visibleEnd - 3;
  const start = input.substring(0, visibleStartLength);
  const end = input.substring(input.length - visibleEnd);

  return `${start}...${end}`;
}
