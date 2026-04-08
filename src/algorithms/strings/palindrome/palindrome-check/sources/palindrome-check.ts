// Palindrome Check — Two-pointer approach
// Returns true if the string reads the same forwards and backwards.
// Time: O(n), Space: O(1)

function palindromeCheck(text: string): boolean {
  let leftIndex = 0; // @step:initialize
  let rightIndex = text.length - 1; // @step:initialize

  while (leftIndex < rightIndex) {
    // @step:compare
    if (text[leftIndex] !== text[rightIndex]) {
      return false; // @step:mismatch
    }
    leftIndex++; // @step:match
    rightIndex--; // @step:match
  }

  return true; // @step:complete
}
