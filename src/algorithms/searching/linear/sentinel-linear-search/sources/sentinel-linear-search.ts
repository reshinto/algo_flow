// Sentinel Linear Search — eliminates the bounds check by placing the target at the end
function sentinelLinearSearch(array: number[], targetValue: number): number {
  // @step:initialize
  const arrayLength = array.length; // @step:initialize
  if (arrayLength === 0) return -1; // @step:initialize

  const lastElement = array[arrayLength - 1]!; // @step:initialize
  array[arrayLength - 1] = targetValue; // @step:initialize — place sentinel

  let currentIndex = 0; // @step:initialize

  while (array[currentIndex] !== targetValue) {
    // @step:visit
    currentIndex++; // @step:visit
  }

  array[arrayLength - 1] = lastElement; // @step:compare — restore last element

  if (currentIndex < arrayLength - 1 || lastElement === targetValue) {
    // @step:compare,found
    return currentIndex; // @step:found
  }

  return -1; // @step:complete
}
