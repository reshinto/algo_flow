// Quick Sort 3-Way — Dutch National Flag partitioning: < pivot | = pivot | > pivot
function quickSort3Way(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize

  function partition3Way(low: number, high: number): void {
    if (low >= high) return; // @step:partition

    const pivotValue = sortedArray[low]!; // @step:partition
    let lessThanPointer = low; // @step:partition
    let greaterThanPointer = high; // @step:partition
    let currentPointer = low; // @step:partition

    // Dutch National Flag partitioning
    while (currentPointer <= greaterThanPointer) {
      // @step:compare
      if (sortedArray[currentPointer]! < pivotValue) {
        // @step:compare
        const temporaryLt = sortedArray[lessThanPointer]!; // @step:swap
        sortedArray[lessThanPointer] = sortedArray[currentPointer]!; // @step:swap
        sortedArray[currentPointer] = temporaryLt; // @step:swap
        lessThanPointer++; // @step:swap
        currentPointer++; // @step:swap
      } else if (sortedArray[currentPointer]! > pivotValue) {
        // @step:compare
        const temporaryGt = sortedArray[greaterThanPointer]!; // @step:swap
        sortedArray[greaterThanPointer] = sortedArray[currentPointer]!; // @step:swap
        sortedArray[currentPointer] = temporaryGt; // @step:swap
        greaterThanPointer--; // @step:swap
        // Do not advance currentPointer — recheck the swapped element
      } else {
        currentPointer++; // @step:compare
      }
    }

    // Elements at [lessThanPointer..greaterThanPointer] are equal to pivot — mark as placed
    // @step:pivot-placed

    // Recursively sort the less-than and greater-than partitions
    partition3Way(low, lessThanPointer - 1); // @step:mark-sorted
    partition3Way(greaterThanPointer + 1, high); // @step:mark-sorted
  }

  if (sortedArray.length > 1) {
    partition3Way(0, sortedArray.length - 1);
  }

  return sortedArray; // @step:complete
}
