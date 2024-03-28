/**
 *
 * @param str String 0000
 * @param newNumber String 1
 */

export function rtrim0(str: string, newNumber: string) {
  const trimmedStr = str.replace(/0+$/, '');

  return trimmedStr + newNumber.padStart(str.length - trimmedStr.length, '0');
}
