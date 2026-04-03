// Cocktail Shaker Sort — bidirectional bubble sort sweeping left-to-right then right-to-left
function cocktailShakerSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  let leftBound = 0; // @step:initialize
  let rightBound = arrayLength - 1; // @step:initialize
  let swapped = true; // @step:initialize

  while (swapped) {
    swapped = false;

    // Forward pass: left to right — bubble largest unsorted element to rightBound
    // @step:forward-pass
    for (let forwardIndex = leftBound; forwardIndex < rightBound; forwardIndex++) {
      // @step:compare
      if (sortedArray[forwardIndex]! > sortedArray[forwardIndex + 1]!) {
        // @step:swap
        const temporaryValue = sortedArray[forwardIndex]!; // @step:swap
        sortedArray[forwardIndex] = sortedArray[forwardIndex + 1]!; // @step:swap
        sortedArray[forwardIndex + 1] = temporaryValue; // @step:swap
        swapped = true; // @step:swap
      }
    }

    // The rightmost unsorted element is now sorted
    // @step:mark-sorted
    rightBound--;

    if (!swapped) break;
    swapped = false;

    // Backward pass: right to left — bubble smallest unsorted element to leftBound
    // @step:backward-pass
    for (let backwardIndex = rightBound; backwardIndex > leftBound; backwardIndex--) {
      // @step:compare
      if (sortedArray[backwardIndex - 1]! > sortedArray[backwardIndex]!) {
        // @step:swap
        const temporaryValue = sortedArray[backwardIndex]!; // @step:swap
        sortedArray[backwardIndex] = sortedArray[backwardIndex - 1]!; // @step:swap
        sortedArray[backwardIndex - 1] = temporaryValue; // @step:swap
        swapped = true; // @step:swap
      }
    }

    // The leftmost unsorted element is now sorted
    // @step:mark-sorted
    leftBound++;
  }

  return sortedArray; // @step:complete
}
