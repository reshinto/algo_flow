// Spaghetti Sort — find and remove tallest strand repeatedly (analogous to physical spaghetti rods)
function spaghettiSort(inputArray: number[]): number[] {
  // @step:initialize
  const originalArray = [...inputArray]; // @step:initialize
  const arrayLength = originalArray.length; // @step:initialize

  // Simulate "holding up spaghetti bundles": work with a copy
  const remainingStrands = [...originalArray]; // @step:initialize
  const sortedResult: number[] = []; // @step:initialize

  // Repeatedly find and remove the tallest strand (maximum element)
  for (let extractionPass = 0; extractionPass < arrayLength; extractionPass++) {
    // @step:find-tallest
    let tallestIndex = 0; // @step:find-tallest
    let tallestValue = remainingStrands[0]!; // @step:find-tallest

    // Scan all remaining strands to find the tallest
    for (let scanIndex = 1; scanIndex < remainingStrands.length; scanIndex++) {
      // @step:compare
      if (remainingStrands[scanIndex]! > tallestValue) {
        // @step:compare
        tallestIndex = scanIndex; // @step:compare
        tallestValue = remainingStrands[scanIndex]!; // @step:compare
      }
    }

    // Remove the tallest strand and place it at the front of the sorted result
    remainingStrands.splice(tallestIndex, 1); // @step:swap
    sortedResult.unshift(tallestValue); // @step:swap — prepend max to build result in ascending order

    // @step:mark-sorted
  }

  return sortedResult; // @step:complete
}
