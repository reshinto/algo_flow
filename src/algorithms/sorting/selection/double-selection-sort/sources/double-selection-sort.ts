// Double Selection Sort — find both minimum and maximum in each pass, place at both ends
function doubleSelectionSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  let leftBound = 0; // @step:initialize
  let rightBound = arrayLength - 1; // @step:initialize

  while (leftBound < rightBound) {
    let minimumIndex = leftBound; // @step:compare
    let maximumIndex = leftBound; // @step:compare

    // Scan between bounds to find both minimum and maximum
    for (let scanIndex = leftBound + 1; scanIndex <= rightBound; scanIndex++) {
      // @step:compare
      if (sortedArray[scanIndex]! < sortedArray[minimumIndex]!) {
        // @step:compare
        minimumIndex = scanIndex; // @step:compare
      }
      if (sortedArray[scanIndex]! > sortedArray[maximumIndex]!) {
        // @step:compare
        maximumIndex = scanIndex; // @step:compare
      }
    }

    // Swap minimum to left bound
    if (minimumIndex !== leftBound) {
      // @step:swap
      const temporaryMin = sortedArray[leftBound]!; // @step:swap
      sortedArray[leftBound] = sortedArray[minimumIndex]!; // @step:swap
      sortedArray[minimumIndex] = temporaryMin; // @step:swap
      // If maximum was at leftBound, it moved to minimumIndex
      if (maximumIndex === leftBound) {
        maximumIndex = minimumIndex; // @step:swap
      }
    }

    // Swap maximum to right bound
    if (maximumIndex !== rightBound) {
      // @step:swap
      const temporaryMax = sortedArray[rightBound]!; // @step:swap
      sortedArray[rightBound] = sortedArray[maximumIndex]!; // @step:swap
      sortedArray[maximumIndex] = temporaryMax; // @step:swap
    }

    // Both ends are now in their sorted positions
    // @step:mark-sorted
    leftBound++; // @step:mark-sorted
    rightBound--; // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
