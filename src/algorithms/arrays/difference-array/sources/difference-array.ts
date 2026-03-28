// Difference Array — O(n + q) range updates via difference array and prefix sum reconstruction
function differenceArray(arrayLength: number, updates: number[][]): number[] {
  const diffArray: number[] = new Array(arrayLength + 1).fill(0); // @step:initialize
  const result: number[] = new Array(arrayLength).fill(0); // @step:initialize

  // Apply each range update [left, right, delta] to the difference array
  for (let updateIndex = 0; updateIndex < updates.length; updateIndex++) {
    const update = updates[updateIndex]!;
    const leftBound = update[0]!; // @step:visit
    const rightBound = update[1]!; // @step:visit
    const delta = update[2]!; // @step:visit
    diffArray[leftBound] += delta; // @step:compare
    if (rightBound + 1 < diffArray.length) {
      // @step:compare
      diffArray[rightBound + 1] -= delta; // @step:compare
    }
  }

  // Reconstruct result via prefix sum of the difference array
  let runningSum = 0; // @step:visit
  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    runningSum += diffArray[scanIndex]!; // @step:visit
    result[scanIndex] = runningSum; // @step:visit
  }

  return result; // @step:complete
}
