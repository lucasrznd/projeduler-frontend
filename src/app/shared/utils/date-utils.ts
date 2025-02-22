export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;

  const [datePart, timePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);

  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);

  if (timePart) {
    const [hours, minutes, seconds] = timePart.split(':');
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(parseInt(seconds));
  }

  return date;
}

