import { createHash } from 'crypto';

/**
 * Generates a random string of alphanumeric characters.
 * @param length - The length of the random string. Defaults to 10.
 * @returns {string} The randomly generated string.
 */
export function generateRandomString(length = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}

/**
 * Generates a hash using SHA256 algorithm.
 *
 * @returns A string representation of the generated hash.
 */
export function generateHash(): string {
  return createHash('sha256').update(generateRandomString()).digest('hex');
}
