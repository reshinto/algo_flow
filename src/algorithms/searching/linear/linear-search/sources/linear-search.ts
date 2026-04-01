// Linear Search — scan left to right comparing each element with the target
function linearSearch(array: number[], targetValue: number): number {
  // @step:initialize
  for (let currentIndex = 0; currentIndex < array.length; currentIndex++) {
    // @step:visit
    const currentValue = array[currentIndex]!; // @step:compare
    if (currentValue === targetValue) {
      // @step:compare,found
      return currentIndex; // @step:found
    }
  }

  return -1; // @step:complete
}
