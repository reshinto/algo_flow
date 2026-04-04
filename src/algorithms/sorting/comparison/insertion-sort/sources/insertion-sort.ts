// Insertion Sort — insert each element into the correct position within the sorted prefix
function insertionSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  for (let outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
    // @step:outer-loop
    const currentValue = sortedArray[outerIndex]!; // @step:outer-loop
    let innerIndex = outerIndex - 1; // @step:outer-loop

    // Shift elements that are greater than currentValue one position to the right
    while (innerIndex >= 0 && sortedArray[innerIndex]! > currentValue) {
      // @step:compare
      sortedArray[innerIndex + 1] = sortedArray[innerIndex]!; // @step:swap
      innerIndex--; // @step:swap
    }

    // Place currentValue in its correct sorted position
    sortedArray[innerIndex + 1] = currentValue; // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
