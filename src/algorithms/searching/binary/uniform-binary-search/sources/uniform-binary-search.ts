// Uniform Binary Search — precomputes delta lookup table for uniform jump sizes
function uniformBinarySearch(sortedArray: number[], targetValue: number): number {
  // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  if (arrayLength === 0) return -1; // @step:initialize

  // Build the delta lookup table: delta[k] = ceil(delta[k-1] / 2)
  const deltaTable: number[] = []; // @step:initialize
  let deltaValue = Math.ceil(arrayLength / 2); // @step:initialize
  while (deltaValue > 0) {
    // @step:initialize
    deltaTable.push(deltaValue); // @step:initialize
    deltaValue = Math.ceil(deltaValue / 2); // @step:initialize
    if (deltaValue === 1 && deltaTable[deltaTable.length - 1] === 1) break; // @step:initialize
    if (deltaValue === 0) break; // @step:initialize
  }
  if (deltaTable[deltaTable.length - 1] !== 1) {
    // @step:initialize
    deltaTable.push(1); // @step:initialize
  }

  let currentIndex = (deltaTable[0] ?? 1) - 1; // @step:initialize
  let stepLevel = 0; // @step:initialize

  while (true) {
    // @step:compare
    const currentValue = sortedArray[currentIndex]!; // @step:compare

    if (currentValue === targetValue) {
      // @step:compare,found
      return currentIndex; // @step:found
    }

    stepLevel++; // @step:eliminate
    const nextDelta = deltaTable[stepLevel] ?? 0; // @step:eliminate

    if (nextDelta === 0) break; // @step:eliminate

    if (currentValue < targetValue) {
      // @step:eliminate
      // Move right
      currentIndex += nextDelta; // @step:eliminate
      if (currentIndex >= arrayLength) break; // @step:eliminate
    } else {
      // @step:eliminate
      // Move left
      currentIndex -= nextDelta; // @step:eliminate
      if (currentIndex < 0) break; // @step:eliminate
    }
  }

  return -1; // @step:complete
}
