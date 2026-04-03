// Pigeonhole Sort — place each element in its own hole, then collect in order
function pigeonholeSort(inputArray: number[]): number[] {
  // @step:initialize
  if (inputArray.length === 0) return []; // @step:initialize
  const workingArray = [...inputArray]; // @step:initialize
  const arrayLength = workingArray.length; // @step:initialize

  const minValue = Math.min(...workingArray); // @step:initialize
  const maxValue = Math.max(...workingArray); // @step:initialize
  const holeCount = maxValue - minValue + 1; // @step:initialize

  // Create one pigeonhole per distinct value in range
  const holes: number[] = new Array(holeCount).fill(0); // @step:initialize

  // Place each element into its corresponding pigeonhole
  for (let placeIndex = 0; placeIndex < arrayLength; placeIndex++) {
    // @step:place,compare
    const holePosition = workingArray[placeIndex]! - minValue; // @step:place,compare
    holes[holePosition]!++; // @step:place
  }

  // Collect elements back from pigeonholes in ascending order
  let writeIndex = 0; // @step:collect
  for (let holeIndex = 0; holeIndex < holeCount; holeIndex++) {
    // @step:collect
    while (holes[holeIndex]! > 0) {
      // @step:collect
      workingArray[writeIndex] = holeIndex + minValue; // @step:collect
      writeIndex++; // @step:collect
      holes[holeIndex]!--; // @step:collect
    }
  }

  // @step:mark-sorted
  return workingArray; // @step:complete
}
