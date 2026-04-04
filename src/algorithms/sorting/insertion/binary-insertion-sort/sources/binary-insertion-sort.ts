// Binary Insertion Sort — use binary search to find position, then shift and insert
function binaryInsertionSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  for (let outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
    const currentElement = sortedArray[outerIndex]!; // @step:binary-search
    let searchLeft = 0; // @step:binary-search
    let searchRight = outerIndex - 1; // @step:binary-search

    // Binary search for the correct insertion position
    while (searchLeft <= searchRight) {
      const midIndex = Math.floor((searchLeft + searchRight) / 2); // @step:compare
      if (currentElement < sortedArray[midIndex]!) {
        // @step:compare
        searchRight = midIndex - 1; // @step:compare
      } else {
        searchLeft = midIndex + 1; // @step:compare
      }
    }

    // Shift elements right to make room for currentElement
    let shiftIndex = outerIndex - 1; // @step:swap
    while (shiftIndex >= searchLeft) {
      // @step:swap
      sortedArray[shiftIndex + 1] = sortedArray[shiftIndex]!; // @step:swap
      shiftIndex--; // @step:swap
    }
    sortedArray[searchLeft] = currentElement; // @step:swap

    // Element is now in its sorted position within the sorted prefix
    // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
