// Search in Rotated Sorted Array — binary search adapted for a rotated sorted array
function searchRotatedArray(sortedArray: number[], targetValue: number): number {
  // @step:initialize
  let lowIndex = 0; // @step:initialize
  let highIndex = sortedArray.length - 1; // @step:initialize

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2); // @step:compare
    const midValue = sortedArray[midIndex]!; // @step:compare

    if (midValue === targetValue) {
      // @step:compare,found
      return midIndex; // @step:found
    }

    // Determine which half is sorted
    const lowValue = sortedArray[lowIndex]!;
    if (lowValue <= midValue) {
      // @step:compare
      // Left half is sorted
      if (lowValue <= targetValue && targetValue < midValue) {
        // @step:eliminate
        // Target is within the sorted left half
        highIndex = midIndex - 1; // @step:eliminate
      } else {
        // @step:eliminate
        // Target is in the right half
        lowIndex = midIndex + 1; // @step:eliminate
      }
    } else {
      // @step:compare
      // Right half is sorted
      const highValue = sortedArray[highIndex]!;
      if (midValue < targetValue && targetValue <= highValue) {
        // @step:eliminate
        // Target is within the sorted right half
        lowIndex = midIndex + 1; // @step:eliminate
      } else {
        // @step:eliminate
        // Target is in the left half
        highIndex = midIndex - 1; // @step:eliminate
      }
    }
  }

  return -1; // @step:complete
}
