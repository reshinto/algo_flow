// Block Merge Sort (simplified GrailSort) — find natural runs, merge in-place via rotation
function blockMergeSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  if (arrayLength <= 1) return sortedArray; // @step:initialize

  // Find natural ascending runs in the array
  // @step:find-runs
  const runBoundaries: number[] = [0]; // @step:find-runs
  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    // @step:compare
    if (sortedArray[scanIndex]! < sortedArray[scanIndex - 1]!) {
      // @step:compare
      runBoundaries.push(scanIndex); // @step:find-runs
    }
  }
  runBoundaries.push(arrayLength); // @step:find-runs

  // Merge runs pairwise until one run covers the full array
  while (runBoundaries.length > 2) {
    const nextBoundaries: number[] = [0]; // @step:merge

    for (let boundaryIndex = 0; boundaryIndex + 2 <= runBoundaries.length - 1; boundaryIndex += 2) {
      const leftStart = runBoundaries[boundaryIndex]!; // @step:merge
      const rightStart = runBoundaries[boundaryIndex + 1]!; // @step:merge
      const mergeEnd = runBoundaries[boundaryIndex + 2]!; // @step:merge

      // In-place merge using rotation
      let leftPointer = leftStart; // @step:compare
      let rightPointer = rightStart; // @step:compare

      while (leftPointer < rightPointer && rightPointer < mergeEnd) {
        // @step:compare
        if (sortedArray[leftPointer]! <= sortedArray[rightPointer]!) {
          // @step:compare
          leftPointer++; // @step:compare
        } else {
          // Rotate the element from rightPointer into the correct position
          const displacedValue = sortedArray[rightPointer]!; // @step:rotate

          // Shift elements from leftPointer to rightPointer-1 one position right
          for (let shiftIndex = rightPointer; shiftIndex > leftPointer; shiftIndex--) {
            // @step:swap
            sortedArray[shiftIndex] = sortedArray[shiftIndex - 1]!; // @step:swap
          }
          sortedArray[leftPointer] = displacedValue; // @step:swap
          leftPointer++; // @step:swap
          rightPointer++; // @step:swap
        }
      }

      if (boundaryIndex + 3 <= runBoundaries.length - 1) {
        nextBoundaries.push(mergeEnd); // @step:merge
      }
    }

    // If there is an odd run left, carry it over unchanged
    if ((runBoundaries.length - 1) % 2 === 1) {
      const lastRunStart = runBoundaries[runBoundaries.length - 2]!; // @step:merge
      nextBoundaries.push(lastRunStart); // @step:merge
    }
    nextBoundaries.push(arrayLength); // @step:merge

    runBoundaries.length = 0; // @step:merge
    for (const boundary of nextBoundaries) runBoundaries.push(boundary); // @step:merge

    // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
