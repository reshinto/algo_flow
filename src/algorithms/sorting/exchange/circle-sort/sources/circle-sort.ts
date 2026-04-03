// Circle Sort — recursively compare elements from outer edges toward center, repeat until no swaps
function circleSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  // Repeat full passes until no swaps occur
  let swapped = true;
  while (swapped) {
    swapped = circleSortPass(sortedArray, 0, arrayLength - 1);
  }

  return sortedArray; // @step:complete
}

// Recursively compare and swap elements from the outer edges inward
function circleSortPass(sortedArray: number[], leftIndex: number, rightIndex: number): boolean {
  if (leftIndex >= rightIndex) {
    return false;
  }

  let swapped = false;
  let low = leftIndex;
  let high = rightIndex;

  while (low < high) {
    // @step:compare
    if (sortedArray[low]! > sortedArray[high]!) {
      // @step:swap
      const temporaryValue = sortedArray[low]!; // @step:swap
      sortedArray[low] = sortedArray[high]!; // @step:swap
      sortedArray[high] = temporaryValue; // @step:swap
      swapped = true;
    }
    low++;
    high--;
  }

  // If the midpoint element is reached (odd-length segment), compare it with one above
  if (low === high) {
    if (sortedArray[low]! > sortedArray[high + 1]!) {
      // @step:swap
      const temporaryValue = sortedArray[low]!; // @step:swap
      sortedArray[low] = sortedArray[high + 1]!; // @step:swap
      sortedArray[high + 1] = temporaryValue; // @step:swap
      swapped = true;
    }
  }

  const midpoint = Math.floor((leftIndex + rightIndex) / 2);
  const leftSwapped = circleSortPass(sortedArray, leftIndex, midpoint);
  const rightSwapped = circleSortPass(sortedArray, midpoint + 1, rightIndex);

  return swapped || leftSwapped || rightSwapped;
}
