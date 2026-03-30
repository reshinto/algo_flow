// Number of Good Pairs — count pairs (i, j) where nums[i] === nums[j] and i < j
function numberOfGoodPairs(numbers: number[]): number {
  const frequencyMap = new Map<number, number>(); // @step:initialize
  let totalPairs = 0;
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!;
    const currentCount = frequencyMap.get(currentNum) ?? 0;
    totalPairs += currentCount; // @step:key-found
    frequencyMap.set(currentNum, currentCount + 1); // @step:increment-count
  }
  return totalPairs; // @step:complete
}

export { numberOfGoodPairs };
