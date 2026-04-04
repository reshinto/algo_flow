// Cyclic Sort — O(n) sort for arrays containing values 1..n by placing each at index value-1
function cyclicSort(inputArray: number[]): number[] {
  const result = [...inputArray]; // @step:initialize
  let currentIndex = 0; // @step:initialize

  while (currentIndex < result.length) {
    const currentValue = result[currentIndex]!; // @step:compare
    const correctIndex = currentValue - 1; // @step:compare

    if (
      correctIndex >= 0 &&
      correctIndex < result.length &&
      correctIndex !== currentIndex &&
      result[correctIndex] !== currentValue
    ) {
      // @step:compare
      const tempValue = result[correctIndex]!; // @step:swap
      result[correctIndex] = result[currentIndex]!; // @step:swap
      result[currentIndex] = tempValue; // @step:swap
    } else {
      currentIndex++; // @step:visit
    }
  }

  return result; // @step:complete
}
