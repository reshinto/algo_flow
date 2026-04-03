// Stooge Sort — recursive: swap first/last if needed, sort first 2/3, last 2/3, first 2/3 again
function stoogeSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize

  function stoogeSortRange(startIndex: number, endIndex: number): void {
    if (startIndex >= endIndex) return;

    // @step:compare
    if (sortedArray[startIndex]! > sortedArray[endIndex]!) {
      // @step:swap
      const temporaryValue = sortedArray[startIndex]!; // @step:swap
      sortedArray[startIndex] = sortedArray[endIndex]!; // @step:swap
      sortedArray[endIndex] = temporaryValue; // @step:swap
    }

    const rangeLength = endIndex - startIndex + 1;
    if (rangeLength > 2) {
      const thirdLength = Math.floor(rangeLength / 3);

      stoogeSortRange(startIndex, endIndex - thirdLength); // Sort first 2/3
      stoogeSortRange(startIndex + thirdLength, endIndex); // Sort last 2/3
      stoogeSortRange(startIndex, endIndex - thirdLength); // Sort first 2/3 again
    }
  }

  stoogeSortRange(0, sortedArray.length - 1);

  // @step:mark-sorted

  return sortedArray; // @step:complete
}
