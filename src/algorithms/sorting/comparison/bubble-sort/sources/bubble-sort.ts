// Bubble Sort — repeatedly swap adjacent out-of-order elements
function bubbleSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  for (let outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
    // @step:outer-loop,mark-sorted
    let swappedThisPass = false; // @step:outer-loop

    // Each pass bubbles the next-largest element into its final position
    for (let innerIndex = 0; innerIndex < arrayLength - 1 - outerIndex; innerIndex++) {
      // @step:inner-loop
      if (sortedArray[innerIndex]! > sortedArray[innerIndex + 1]!) {
        // @step:compare
        const temporaryValue = sortedArray[innerIndex]!; // @step:swap
        sortedArray[innerIndex] = sortedArray[innerIndex + 1]!; // @step:swap
        sortedArray[innerIndex + 1] = temporaryValue; // @step:swap
        swappedThisPass = true; // @step:swap
      }
    }

    // No swaps means the array is already sorted — exit early for O(n) best case
    if (!swappedThisPass) break; // @step:early-exit
  }

  return sortedArray; // @step:complete
}
