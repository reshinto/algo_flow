// Rabin-Karp Pattern Matching
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Uses a rolling polynomial hash to skip comparisons when hashes differ.
// Time: O(n + m) average, O(n * m) worst case (hash collisions)
// Space: O(1)

const HASH_BASE = 31;
const HASH_PRIME = 1_000_000_007;

function rabinKarpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0; // @step:initialize
  if (pattern.length > text.length) return -1; // @step:initialize

  const patternLen = pattern.length; // @step:initialize
  const textLen = text.length; // @step:initialize

  // Compute base^(patternLen-1) % prime for rolling hash window removal
  let highPow = 1; // @step:initialize
  for (let powIdx = 0; powIdx < patternLen - 1; powIdx++) {
    highPow = (highPow * HASH_BASE) % HASH_PRIME; // @step:initialize
  }

  // Compute hash of pattern and first window
  let patternHash = 0; // @step:initialize
  let windowHash = 0; // @step:initialize
  for (let charIdx = 0; charIdx < patternLen; charIdx++) {
    patternHash = (patternHash * HASH_BASE + pattern.charCodeAt(charIdx)) % HASH_PRIME; // @step:initialize
    windowHash = (windowHash * HASH_BASE + text.charCodeAt(charIdx)) % HASH_PRIME; // @step:initialize
  }

  // Slide the window over the text
  for (let windowStart = 0; windowStart <= textLen - patternLen; windowStart++) {
    // @step:visit
    if (windowHash === patternHash) {
      // Hashes match — verify character by character to rule out false positives
      let charIdx = 0; // @step:char-match
      while (charIdx < patternLen && text[windowStart + charIdx] === pattern[charIdx]) {
        charIdx++; // @step:char-match
      }

      if (charIdx === patternLen) {
        return windowStart; // @step:char-match
      }
      // Hash collision — hashes matched but characters did not
    }

    // Roll hash: remove leading character, add next character
    if (windowStart < textLen - patternLen) {
      const outgoingCharCode = text.charCodeAt(windowStart); // @step:pattern-shift
      const incomingCharCode = text.charCodeAt(windowStart + patternLen); // @step:pattern-shift
      windowHash =
        ((windowHash - outgoingCharCode * highPow) * HASH_BASE + incomingCharCode) % HASH_PRIME; // @step:pattern-shift
      if (windowHash < 0) windowHash += HASH_PRIME; // @step:pattern-shift
    }
  }

  return -1; // @step:complete
}
