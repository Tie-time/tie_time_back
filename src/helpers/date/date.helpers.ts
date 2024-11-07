// Convert date with time to date without time
export function getDateWithoutTime(date: Date): Date {
  return new Date(date.toISOString().split("T")[0]);
}
