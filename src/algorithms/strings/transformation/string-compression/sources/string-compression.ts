// String Compression (Run-Length Encoding) — count consecutive repeated characters.
// Returns the compressed form "a2b1c5a3" only if shorter than the original; otherwise returns the original.
// Time: O(n)  Space: O(n) for the output buffer

export function stringCompression(text: string): string {
  if (text.length === 0) return text; // @step:initialize

  let compressed = ""; // @step:initialize
  let charIndex = 0; // @step:initialize

  while (charIndex < text.length) {
    const currentChar = text[charIndex] ?? ""; // @step:read-char
    let count = 0; // @step:read-char

    while (charIndex < text.length && text[charIndex] === currentChar) {
      count++; // @step:count
      charIndex++; // @step:count
    }

    compressed += currentChar; // @step:write-char
    compressed += String(count); // @step:write-char
  }

  return compressed.length < text.length ? compressed : text; // @step:complete
}
