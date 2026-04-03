// Bozo Sort — randomly swap two elements until sorted; uses seeded LCG PRNG for determinism
function bozoSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  const maxIterations = 200; // @step:initialize

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

  let iterationCount = 0;
  while (!isSorted() && iterationCount < maxIterations) {
    // Pick two random distinct indices and swap them
    const firstSwapIndex = nextRandom() % arrayLength; // @step:swap
    const secondSwapIndex = nextRandom() % arrayLength; // @step:swap

    if (firstSwapIndex !== secondSwapIndex) {
      // @step:swap
      const temporaryValue = sortedArray[firstSwapIndex]!; // @step:swap
      sortedArray[firstSwapIndex] = sortedArray[secondSwapIndex]!; // @step:swap
      sortedArray[secondSwapIndex] = temporaryValue; // @step:swap
    }

    iterationCount++;
  }

  return sortedArray; // @step:complete
}
