// Reverse String — two-pointer in-place swap on a character array.
// Returns the reversed version of the input string.
// Time: O(n)  Space: O(1) auxiliary (O(n) for the output string)

function reverseString(text: string): string {
  const chars = text.split(""); // @step:initialize

  let leftIndex = 0; // @step:initialize
  let rightIndex = chars.length - 1; // @step:initialize

  while (leftIndex < rightIndex) {
    const leftChar = chars[leftIndex]; // @step:read-char
    const rightChar = chars[rightIndex]; // @step:read-char

    chars[leftIndex] = rightChar ?? ""; // @step:swap-pointers
    chars[rightIndex] = leftChar ?? ""; // @step:swap-pointers

    leftIndex++; // @step:visit
    rightIndex--; // @step:visit
  }

  return chars.join(""); // @step:complete
}
