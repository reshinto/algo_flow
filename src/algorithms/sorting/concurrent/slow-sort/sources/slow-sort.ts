// Slow Sort — multiply-and-surrender: recursively find max of halves, swap to end, sort remainder
function slowSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize

  function slowSortRange(startIndex: number, endIndex: number): void {
    if (startIndex >= endIndex) return;

    const midIndex = Math.floor((startIndex + endIndex) / 2);

    slowSortRange(startIndex, midIndex); // Sort first half
    slowSortRange(midIndex + 1, endIndex); // Sort second half

    // Find the maximum of both halves (now at their respective ends)
    // @step:compare
    if (sortedArray[midIndex]! > sortedArray[endIndex]!) {
      // @step:swap
      const temporaryValue = sortedArray[midIndex]!; // @step:swap
      sortedArray[midIndex] = sortedArray[endIndex]!; // @step:swap
      sortedArray[endIndex] = temporaryValue; // @step:swap
    }

    // The maximum is now at endIndex — recursively sort the rest
    slowSortRange(startIndex, endIndex - 1); // @step:mark-sorted
  }

  slowSortRange(0, sortedArray.length - 1);

  return sortedArray; // @step:complete
}
