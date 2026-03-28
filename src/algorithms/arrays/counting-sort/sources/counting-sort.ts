// Counting Sort — O(n+k) sort by counting frequencies and reconstructing sorted order
function countingSort(inputArray: number[]): number[] {
  if (inputArray.length === 0) {
    // @step:initialize
    return []; // @step:initialize
  }

  const maxValue = Math.max(...inputArray); // @step:initialize
  const countArray: number[] = new Array(maxValue + 1).fill(0); // @step:initialize

  // Count the frequency of each element
  for (let scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
    countArray[inputArray[scanIndex]!]!++; // @step:visit
  }

  // Reconstruct the sorted array from count frequencies
  const sortedArray: number[] = []; // @step:compare
  for (let currentValue = 0; currentValue <= maxValue; currentValue++) {
    for (let repeatIndex = 0; repeatIndex < countArray[currentValue]!; repeatIndex++) {
      sortedArray.push(currentValue); // @step:compare
    }
  }

  return sortedArray; // @step:complete
}
