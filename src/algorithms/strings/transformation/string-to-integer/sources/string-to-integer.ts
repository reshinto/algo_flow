// String to Integer (atoi) — parse an integer from a string.
// Skips leading whitespace, reads optional sign, reads digits, clamps to 32-bit range.
// Time: O(n)  Space: O(1)

const INT32_MIN = -(2 ** 31);
const INT32_MAX = 2 ** 31 - 1;

function stringToInteger(text: string): number {
  let charIndex = 0; // @step:initialize
  const length = text.length; // @step:initialize

  // Phase 1: skip leading whitespace
  while (charIndex < length && text[charIndex] === " ") {
    charIndex++; // @step:skip-whitespace
  }

  // Phase 2: read optional sign
  let sign = 1; // @step:read-sign
  if (text[charIndex] === "-") {
    sign = -1; // @step:read-sign
    charIndex++; // @step:read-sign
  } else if (text[charIndex] === "+") {
    charIndex++; // @step:read-sign
  }

  // Phase 3: read digits and accumulate
  let result = 0; // @step:read-digits
  while (charIndex < length) {
    const charCode = text.charCodeAt(charIndex); // @step:read-digits
    if (charCode < 48 || charCode > 57) break; // @step:read-digits

    const digit = charCode - 48; // @step:write-char
    result = result * 10 + digit; // @step:write-char

    // Clamp early to avoid overflow in JS
    if (sign === 1 && result > INT32_MAX) return INT32_MAX; // @step:write-char
    if (sign === -1 && -result < INT32_MIN) return INT32_MIN; // @step:write-char

    charIndex++; // @step:read-digits
  }

  return Math.max(INT32_MIN, Math.min(INT32_MAX, sign * result)) || 0; // @step:complete
}
