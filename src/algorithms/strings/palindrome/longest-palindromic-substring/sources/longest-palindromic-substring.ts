// Longest Palindromic Substring — Expand Around Center approach
// Returns the longest substring of `text` that is a palindrome.
// Time: O(n²), Space: O(1)

export function longestPalindromicSubstring(text: string): string {
  if (text.length === 0) return ""; // @step:initialize

  let longestStart = 0; // @step:initialize
  let longestLength = 1; // @step:initialize

  for (let centerIndex = 0; centerIndex < text.length; centerIndex++) {
    // @step:expandCenter

    // Odd-length palindromes: single character as center
    let oddRadius = 0; // @step:expandCenter
    while (
      centerIndex - oddRadius - 1 >= 0 &&
      centerIndex + oddRadius + 1 < text.length &&
      text[centerIndex - oddRadius - 1] === text[centerIndex + oddRadius + 1]
    ) {
      // @step:compareChars
      oddRadius++; // @step:charsMatch
    }
    const oddLength = 2 * oddRadius + 1; // @step:updateLongest
    if (oddLength > longestLength) {
      // @step:updateLongest
      longestStart = centerIndex - oddRadius; // @step:updateLongest
      longestLength = oddLength; // @step:updateLongest
    }

    // Even-length palindromes: gap between centerIndex and centerIndex+1
    if (centerIndex + 1 < text.length && text[centerIndex] === text[centerIndex + 1]) {
      // @step:compareChars
      let evenRadius = 1; // @step:charsMatch
      while (
        centerIndex - evenRadius >= 0 &&
        centerIndex + evenRadius + 1 < text.length &&
        text[centerIndex - evenRadius] === text[centerIndex + evenRadius + 1]
      ) {
        // @step:compareChars
        evenRadius++; // @step:charsMatch
      }
      const evenLength = 2 * evenRadius; // @step:updateLongest
      if (evenLength > longestLength) {
        // @step:updateLongest
        longestStart = centerIndex - evenRadius + 1; // @step:updateLongest
        longestLength = evenLength; // @step:updateLongest
      }
    }
  }

  return text.slice(longestStart, longestStart + longestLength); // @step:complete
}
