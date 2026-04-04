// Shell Sort — generalized insertion sort with decreasing gap sequence
function shellSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  // Start with half the array length and halve the gap each pass
  for (let gapSize = Math.floor(arrayLength / 2); gapSize > 0; gapSize = Math.floor(gapSize / 2)) {
    // @step:gap-update

    // Perform a gapped insertion sort for this gap size
    for (let outerIndex = gapSize; outerIndex < arrayLength; outerIndex++) {
      // @step:compare
      const currentValue = sortedArray[outerIndex]!; // @step:compare
      let innerIndex = outerIndex; // @step:compare

      // Shift elements that are larger than currentValue by gapSize positions
      while (innerIndex >= gapSize && sortedArray[innerIndex - gapSize]! > currentValue) {
        // @step:compare
        sortedArray[innerIndex] = sortedArray[innerIndex - gapSize]!; // @step:swap
        innerIndex -= gapSize; // @step:swap
      }

      // Place currentValue in its gap-relative sorted position
      sortedArray[innerIndex] = currentValue; // @step:swap
    }

    // When gap reduces to 1 the final pass is a standard insertion sort
    // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
