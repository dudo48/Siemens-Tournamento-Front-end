import { Sport } from "./types";

// get the ordinal suffix of a number
export const getOrdinalSuffix = (x: number) => {
  const moduloTen = x % 10;
  const moduloHundred = x % 100;

  if (moduloTen === 1 && moduloHundred !== 11) {
    return 'st';
  }
  if (moduloTen === 2 && moduloHundred !== 12) {
    return 'nd';
  }
  if (moduloTen === 3 && moduloHundred !== 13) {
    return 'rd';
  }

  return 'th';
}