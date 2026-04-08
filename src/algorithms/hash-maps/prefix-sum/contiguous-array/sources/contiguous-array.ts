// Contiguous Array — find the longest subarray with equal number of 0s and 1s
function contiguousArray(numbers: number[]): number {
  const prefixSumMap = new Map<number, number>(); // @step:initialize
  prefixSumMap.set(0, -1);
  let runningSum = 0;
  let maxLength = 0;
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    runningSum += numbers[elementIndex] === 0 ? -1 : 1; // @step:check-prefix
    const previousIndex = prefixSumMap.get(runningSum);
    if (previousIndex !== undefined) {
      const subarrayLength = elementIndex - previousIndex; // @step:prefix-found
      maxLength = Math.max(maxLength, subarrayLength);
    } else {
      prefixSumMap.set(runningSum, elementIndex); // @step:insert-key
    }
  }
  return maxLength; // @step:complete
}
