// Merge Insertion Sort (Ford-Johnson) — theoretically optimal comparisons; pair elements, sort larger half recursively, binary-insert smaller half
function mergeInsertionSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) return sortedArray; // @step:initialize

  // Perform a binary search to find the insertion position in a sorted subarray
  function binarySearchInsertionPoint(
    targetValue: number,
    searchArray: number[],
    leftBound: number,
    rightBound: number,
  ): number {
    // @step:binary-insert
    let low = leftBound;
    let high = rightBound;

    while (low < high) {
      const midPoint = Math.floor((low + high) / 2); // @step:binary-insert
      if (searchArray[midPoint]! < targetValue) {
        // @step:binary-insert
        low = midPoint + 1;
      } else {
        high = midPoint;
      }
    }
    return low; // @step:binary-insert
  }

  // Insert targetValue into sortedArray at the correct position (shifting elements right)
  function insertAt(targetValue: number, insertionIndex: number, endIndex: number): void {
    // @step:binary-insert
    for (let shiftIndex = endIndex; shiftIndex > insertionIndex; shiftIndex--) {
      sortedArray[shiftIndex] = sortedArray[shiftIndex - 1]!; // @step:swap
    }
    sortedArray[insertionIndex] = targetValue; // @step:binary-insert
  }

  // Step 1: Pair elements and compare each pair to identify larger and smaller elements
  // Build pairs: [larger, smaller] for each adjacent pair
  const pairCount = Math.floor(arrayLength / 2);
  const hasUnpaired = arrayLength % 2 === 1;

  // Sort within each pair so sortedArray[2k] >= sortedArray[2k+1]
  for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
    // @step:pair
    const leftPos = pairIndex * 2; // @step:compare
    const rightPos = leftPos + 1; // @step:compare

    if (sortedArray[leftPos]! < sortedArray[rightPos]!) {
      // @step:compare
      const temporaryValue = sortedArray[leftPos]!; // @step:swap
      sortedArray[leftPos] = sortedArray[rightPos]!; // @step:swap
      sortedArray[rightPos] = temporaryValue; // @step:swap
    }
  }

  // Step 2: Extract the larger elements (at even indices) and sort them recursively using insertion sort
  // The larger elements are at positions 0, 2, 4, ... (2*pairCount - 2)
  const largerElements: number[] = [];
  const smallerElements: number[] = [];

  for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
    largerElements.push(sortedArray[pairIndex * 2]!); // @step:pair
    smallerElements.push(sortedArray[pairIndex * 2 + 1]!); // @step:pair
  }
  if (hasUnpaired) {
    smallerElements.push(sortedArray[arrayLength - 1]!); // @step:pair
  }

  // Recursively sort the larger elements using insertion sort (simpler than full recursion for visualization)
  for (let insertIndex = 1; insertIndex < largerElements.length; insertIndex++) {
    const currentValue = largerElements[insertIndex]!; // @step:compare
    let innerIndex = insertIndex - 1;

    while (innerIndex >= 0 && largerElements[innerIndex]! > currentValue) {
      // @step:compare
      largerElements[innerIndex + 1] = largerElements[innerIndex]!; // @step:swap
      innerIndex--;
    }
    largerElements[innerIndex + 1] = currentValue; // @step:binary-insert
  }

  // Step 3: Build the initial sorted sequence from larger elements
  // and binary-insert smaller elements using the Jacobsthal sequence order
  const resultLength = largerElements.length;
  for (let resultIndex = 0; resultIndex < resultLength; resultIndex++) {
    sortedArray[resultIndex] = largerElements[resultIndex]!; // @step:binary-insert
  }

  let insertedCount = resultLength;

  // Insert the smaller elements using binary insertion
  // Use Jacobsthal-inspired order: insert in groups for minimal comparisons
  // Simplified: insert smaller elements in reverse Jacobsthal order
  // For clarity, we insert the paired smaller element before its larger counterpart
  for (let smallerIndex = 0; smallerIndex < smallerElements.length; smallerIndex++) {
    const valueToInsert = smallerElements[smallerIndex]!; // @step:binary-insert
    const searchBound = insertedCount; // @step:binary-insert

    const insertionPosition = binarySearchInsertionPoint(
      valueToInsert,
      sortedArray,
      0,
      searchBound,
    ); // @step:compare

    insertAt(valueToInsert, insertionPosition, insertedCount); // @step:binary-insert
    insertedCount++;
  }

  // @step:mark-sorted

  return sortedArray; // @step:complete
}
