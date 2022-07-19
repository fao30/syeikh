export function formatDateWithZone(date, tz) {
  let s = date.toLocaleString("en-GB", { timeZone: tz });
  let a = s.split(/\D/);
  return a[2] + "-" + a[1] + "-" + a[0] + " " + a[3] + ":" + a[4];
}
