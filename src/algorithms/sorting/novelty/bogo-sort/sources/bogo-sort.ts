// Bogo Sort — randomly shuffle until sorted; uses seeded LCG PRNG for determinism
function bogoSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  const maxIterations = 100; // @step:initialize

  // Seeded linear congruential generator for deterministic behavior
  let seed = 42; // @step:initialize
  function nextRandom(): number {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed;
  }

  function isSorted(): boolean {
    // @step:check-sorted
    for (let checkIndex = 0; checkIndex + 1 < arrayLength; checkIndex++) {
      // @step:compare
      if (sortedArray[checkIndex]! > sortedArray[checkIndex + 1]!) {
        // @step:compare
        return false; // @step:compare
      }
    }
    return true; // @step:check-sorted
  }

  function shuffleArray(): void {
    // @step:shuffle
    for (let shuffleIndex = arrayLength - 1; shuffleIndex > 0; shuffleIndex--) {
      // @step:shuffle
      const swapTarget = nextRandom() % (shuffleIndex + 1); // @step:shuffle
      const temporaryValue = sortedArray[shuffleIndex]!; // @step:swap
      sortedArray[shuffleIndex] = sortedArray[swapTarget]!; // @step:swap
      sortedArray[swapTarget] = temporaryValue; // @step:swap
    }
  }

  let iterationCount = 0;
  while (!isSorted() && iterationCount < maxIterations) {
    shuffleArray();
    iterationCount++;
  }

  // @step:mark-sorted

  return sortedArray; // @step:complete
}
