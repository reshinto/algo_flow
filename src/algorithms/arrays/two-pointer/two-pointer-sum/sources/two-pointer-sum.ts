// Two Sum (Sorted Array) — O(n) two-pointer: converge from both ends toward the target sum
function twoPointerSum(
  sortedArray: number[],
  target: number,
): { found: boolean; leftIndex: number; rightIndex: number } {
  let leftPointer = 0; // @step:initialize
  let rightPointer = sortedArray.length - 1; // @step:initialize

  while (leftPointer < rightPointer) {
    const currentSum = sortedArray[leftPointer]! + sortedArray[rightPointer]!; // @step:visit

    if (currentSum === target) {
      // @step:compare
      return { found: true, leftIndex: leftPointer, rightIndex: rightPointer }; // @step:complete
    } else if (currentSum < target) {
      // @step:compare
      leftPointer++; // @step:visit
    } else {
      rightPointer--; // @step:visit
    }
  }

  return { found: false, leftIndex: -1, rightIndex: -1 }; // @step:complete
}
