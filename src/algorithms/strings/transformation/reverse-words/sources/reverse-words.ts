// Reverse Words in a String — split, reverse word order, rejoin with single spaces.
// Trims leading/trailing whitespace and collapses multiple spaces between words.
// Time: O(n)  Space: O(n)

function reverseWords(text: string): string {
  const words = text.trim().split(/\s+/); // @step:initialize

  let leftIndex = 0; // @step:initialize
  let rightIndex = words.length - 1; // @step:initialize

  while (leftIndex < rightIndex) {
    const leftWord = words[leftIndex]; // @step:read-char
    const rightWord = words[rightIndex]; // @step:read-char

    words[leftIndex] = rightWord ?? ""; // @step:swap-pointers
    words[rightIndex] = leftWord ?? ""; // @step:swap-pointers

    leftIndex++; // @step:visit
    rightIndex--; // @step:visit
  }

  return words.join(" "); // @step:complete
}
