// Minimum in Rotated Sorted Array — binary search variant finding the rotation pivot
function minRotatedArray(sortedArray: number[]): number {
  // @step:initialize
  let lowIndex = 0; // @step:initialize
  let highIndex = sortedArray.length - 1; // @step:initialize

  while (lowIndex < highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2); // @step:compare
    const midValue = sortedArray[midIndex]!; // @step:compare
    const highValue = sortedArray[highIndex]!; // @step:compare

    if (midValue > highValue) {
      // @step:compare,eliminate
      // Minimum is in the right half — discard left including mid
      lowIndex = midIndex + 1; // @step:eliminate
    } else {
      // @step:eliminate
      // Minimum is in the left half or at mid — discard right
      highIndex = midIndex; // @step:eliminate
    }
  }

  return sortedArray[lowIndex]!; // @step:found,complete
}
