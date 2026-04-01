// Find Peak Element — binary search on slope to find a peak in O(log n)
function findPeakElement(array: number[]): number {
  // @step:initialize
  let lowIndex = 0; // @step:initialize
  let highIndex = array.length - 1; // @step:initialize

  while (lowIndex < highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2); // @step:compare
    const midValue = array[midIndex]!; // @step:compare
    const nextValue = array[midIndex + 1]!; // @step:compare

    if (midValue < nextValue) {
      // @step:eliminate
      // Slope is ascending — peak must be to the right
      lowIndex = midIndex + 1; // @step:eliminate
    } else {
      // @step:eliminate
      // Slope is descending or flat — peak is at mid or to the left
      highIndex = midIndex; // @step:eliminate
    }
  }

  return lowIndex; // @step:found,complete
}
