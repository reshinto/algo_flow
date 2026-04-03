// Dual-Pivot Quick Sort — two pivots create three partitions: < pivot1 | pivot1..pivot2 | > pivot2
function dualPivotQuickSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize

  function partition(low: number, high: number): void {
    if (low >= high) return; // @step:partition

    // Ensure pivot1 <= pivot2
    if (sortedArray[low]! > sortedArray[high]!) {
      // @step:partition
      const temporaryPivot = sortedArray[low]!; // @step:partition
      sortedArray[low] = sortedArray[high]!; // @step:partition
      sortedArray[high] = temporaryPivot; // @step:partition
    }

    const pivot1 = sortedArray[low]!; // @step:partition
    const pivot2 = sortedArray[high]!; // @step:partition

    let lessThanPointer = low + 1; // @step:partition
    let greaterThanPointer = high - 1; // @step:partition
    let currentPointer = low + 1; // @step:partition

    while (currentPointer <= greaterThanPointer) {
      // @step:compare
      if (sortedArray[currentPointer]! < pivot1) {
        // @step:compare
        const temporaryLt = sortedArray[lessThanPointer]!; // @step:swap
        sortedArray[lessThanPointer] = sortedArray[currentPointer]!; // @step:swap
        sortedArray[currentPointer] = temporaryLt; // @step:swap
        lessThanPointer++; // @step:swap
        currentPointer++; // @step:swap
      } else if (sortedArray[currentPointer]! > pivot2) {
        // @step:compare
        // Find the rightmost non-greater element
        while (greaterThanPointer > currentPointer && sortedArray[greaterThanPointer]! > pivot2) {
          // @step:compare
          greaterThanPointer--; // @step:compare
        }
        const temporaryGt = sortedArray[greaterThanPointer]!; // @step:swap
        sortedArray[greaterThanPointer] = sortedArray[currentPointer]!; // @step:swap
        sortedArray[currentPointer] = temporaryGt; // @step:swap
        greaterThanPointer--; // @step:swap
        // Recheck currentPointer
      } else {
        currentPointer++; // @step:compare
      }
    }

    // Place pivot1 and pivot2 in their final positions
    lessThanPointer--; // @step:pivot-placed
    greaterThanPointer++; // @step:pivot-placed

    const temporaryP1 = sortedArray[low]!; // @step:pivot-placed
    sortedArray[low] = sortedArray[lessThanPointer]!; // @step:pivot-placed
    sortedArray[lessThanPointer] = temporaryP1; // @step:pivot-placed

    const temporaryP2 = sortedArray[high]!; // @step:pivot-placed
    sortedArray[high] = sortedArray[greaterThanPointer]!; // @step:pivot-placed
    sortedArray[greaterThanPointer] = temporaryP2; // @step:pivot-placed

    // Both pivots are now at their final sorted positions
    // @step:mark-sorted

    // Recursively sort three partitions
    partition(low, lessThanPointer - 1); // @step:mark-sorted
    partition(lessThanPointer + 1, greaterThanPointer - 1); // @step:mark-sorted
    partition(greaterThanPointer + 1, high); // @step:mark-sorted
  }

  if (sortedArray.length > 1) {
    partition(0, sortedArray.length - 1);
  }

  return sortedArray; // @step:complete
}
