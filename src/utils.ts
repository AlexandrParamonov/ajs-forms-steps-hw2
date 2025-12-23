export function toISO(dateStr: string): string {
  const [dd, mm, yy] = dateStr.split(".");
  return `20${yy}-${mm}-${dd}`;
}

export function toDisplay(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y.slice(2)}`;
}