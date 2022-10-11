/** @format */

export function getLargest(a, b, c) {
  if (a > b) {
    if (a > c) return "ISNOT";
  } else if (b > c) return "ISYES";

  return "SOMETIMES";
}
