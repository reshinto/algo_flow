// Valid Palindrome — Two-pointer approach ignoring non-alphanumeric characters
// Returns true if the string is a palindrome when only alphanumeric characters are considered.
// Time: O(n), Space: O(1)

export function validPalindrome(text: string): boolean {
  let leftIndex = 0; // @step:initialize
  let rightIndex = text.length - 1; // @step:initialize

  while (leftIndex < rightIndex) {
    while (leftIndex < rightIndex && !isAlphanumeric(text[leftIndex] ?? "")) {
      leftIndex++; // @step:skipNonAlphanumeric
    }
    while (leftIndex < rightIndex && !isAlphanumeric(text[rightIndex] ?? "")) {
      rightIndex--; // @step:skipNonAlphanumeric
    }

    // @step:compare
    if ((text[leftIndex] ?? "").toLowerCase() !== (text[rightIndex] ?? "").toLowerCase()) {
      return false; // @step:mismatch
    }
    leftIndex++; // @step:match
    rightIndex--; // @step:match
  }

  return true; // @step:complete
}

function isAlphanumeric(char: string): boolean {
  return /[a-zA-Z0-9]/.test(char);
}
