// First Missing Positive — O(n) time, O(1) space via index-as-value placement
function firstMissingPositive(inputArray: number[]): { missingPositive: number } {
  const result = [...inputArray];
  const arrayLength = result.length; // @step:initialize

  // Phase 1: Place each value v in range [1..n] at index v-1 by swapping
  for (let placementIndex = 0; placementIndex < arrayLength; placementIndex++) {
    // Keep swapping until the current slot holds its correct value or an out-of-range value
    while (
      result[placementIndex]! >= 1 &&
      result[placementIndex]! <= arrayLength &&
      result[result[placementIndex]! - 1] !== result[placementIndex]
    ) {
      const correctIndex = result[placementIndex]! - 1; // @step:compare
      const tempValue = result[correctIndex]!; // @step:swap
      result[correctIndex] = result[placementIndex]!; // @step:swap
      result[placementIndex] = tempValue; // @step:swap
    }
  }

  // Phase 2: Scan for the first index where arr[index] !== index + 1
  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    if (result[scanIndex] !== scanIndex + 1) {
      return { missingPositive: scanIndex + 1 }; // @step:compare
    }
  }

  return { missingPositive: arrayLength + 1 }; // @step:complete
}
