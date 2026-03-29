// Merge Two Sorted Arrays — O(n+m) merge using two pointers
function mergeSortedArrays(firstArray: number[], secondArray: number[]): number[] {
  const merged: number[] = []; // @step:initialize
  let firstPointer = 0; // @step:initialize
  let secondPointer = 0; // @step:initialize

  // Compare front elements from each array, place the smaller into result
  while (firstPointer < firstArray.length && secondPointer < secondArray.length) {
    if (firstArray[firstPointer]! <= secondArray[secondPointer]!) {
      // @step:compare
      merged.push(firstArray[firstPointer]!); // @step:visit
      firstPointer++; // @step:visit
    } else {
      merged.push(secondArray[secondPointer]!); // @step:visit
      secondPointer++; // @step:visit
    }
  }

  // Drain remaining elements from whichever array has leftovers
  while (firstPointer < firstArray.length) {
    merged.push(firstArray[firstPointer]!); // @step:visit
    firstPointer++; // @step:visit
  }
  while (secondPointer < secondArray.length) {
    merged.push(secondArray[secondPointer]!); // @step:visit
    secondPointer++; // @step:visit
  }

  return merged; // @step:complete
}
