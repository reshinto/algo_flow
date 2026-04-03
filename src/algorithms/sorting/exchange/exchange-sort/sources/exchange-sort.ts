// Exchange Sort — for each element, compare with all subsequent elements and swap if out of order
function exchangeSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  for (let outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
    for (let innerIndex = outerIndex + 1; innerIndex < arrayLength; innerIndex++) {
      // @step:compare
      if (sortedArray[outerIndex]! > sortedArray[innerIndex]!) {
        // @step:swap
        const temporaryValue = sortedArray[outerIndex]!; // @step:swap
        sortedArray[outerIndex] = sortedArray[innerIndex]!; // @step:swap
        sortedArray[innerIndex] = temporaryValue; // @step:swap
      }
    }

    // The element at outerIndex is now in its final sorted position
    // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
