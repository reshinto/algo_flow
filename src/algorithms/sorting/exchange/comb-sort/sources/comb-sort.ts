// Comb Sort — improved bubble sort using a shrinking gap (factor 1.3) to eliminate turtles
function combSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  const SHRINK_FACTOR = 1.3; // @step:initialize
  let gap = arrayLength; // @step:initialize
  let sorted = false; // @step:initialize

  while (!sorted) {
    // Shrink the gap by the shrink factor
    // @step:gap-update
    gap = Math.floor(gap / SHRINK_FACTOR); // @step:gap-update
    if (gap <= 1) {
      gap = 1;
      sorted = true; // assume sorted until a swap proves otherwise
    }

    // Perform a pass with the current gap
    for (let startIndex = 0; startIndex + gap < arrayLength; startIndex++) {
      const compareIndex = startIndex + gap;
      // @step:compare
      if (sortedArray[startIndex]! > sortedArray[compareIndex]!) {
        // @step:swap
        const temporaryValue = sortedArray[startIndex]!; // @step:swap
        sortedArray[startIndex] = sortedArray[compareIndex]!; // @step:swap
        sortedArray[compareIndex] = temporaryValue; // @step:swap
        sorted = false; // a swap occurred — need another pass
      }
    }
  }

  // All elements are now in their sorted positions
  // @step:mark-sorted

  return sortedArray; // @step:complete
}
