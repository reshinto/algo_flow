// Counting Sort — count occurrences of each value, then place elements in sorted order
function countingSortDistribution(inputArray: number[]): number[] {
  // @step:initialize
  if (inputArray.length === 0) return []; // @step:initialize
  const workingArray = [...inputArray]; // @step:initialize
  const arrayLength = workingArray.length; // @step:initialize

  // Find the range of values
  let minValue = workingArray[0]!; // @step:initialize
  let maxValue = workingArray[0]!; // @step:initialize
  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    // @step:initialize
    if (workingArray[scanIndex]! < minValue) minValue = workingArray[scanIndex]!; // @step:initialize
    if (workingArray[scanIndex]! > maxValue) maxValue = workingArray[scanIndex]!; // @step:initialize
  }

  const range = maxValue - minValue + 1; // @step:initialize
  const countArray = new Array<number>(range).fill(0); // @step:initialize

  // Count occurrences of each value
  for (let countIndex = 0; countIndex < arrayLength; countIndex++) {
    // @step:count,compare
    const bucketPosition = workingArray[countIndex]! - minValue; // @step:count,compare
    countArray[bucketPosition]!++; // @step:count
  }

  // Place elements back into the array in sorted order
  let writeIndex = 0; // @step:place
  for (let valueIndex = 0; valueIndex < range; valueIndex++) {
    // @step:place
    while (countArray[valueIndex]! > 0) {
      // @step:place
      workingArray[writeIndex] = valueIndex + minValue; // @step:place
      writeIndex++; // @step:place
      countArray[valueIndex]!--; // @step:place
    }
  }

  // @step:mark-sorted
  return workingArray; // @step:complete
}
