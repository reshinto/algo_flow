// String Rotation Check — checks if pattern is a rotation of text.
// Concatenates text with itself and searches for pattern as a substring.
// Time: O(n)  Space: O(n) for the concatenated string

function stringRotationCheck(text: string, pattern: string): boolean {
  if (pattern.length !== text.length) return false; // @step:initialize

  const concatenated = text + text; // @step:write-char

  return concatenated.includes(pattern); // @step:visit
}
