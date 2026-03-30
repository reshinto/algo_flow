// Majority Element — find the element that appears more than n/2 times using a frequency map
function majorityElement(numbers: number[]): number {
  const frequencyMap = new Map<number, number>(); // @step:initialize
  const threshold = Math.floor(numbers.length / 2); // @step:initialize
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!; // @step:increment-count
    const updatedCount = (frequencyMap.get(currentNum) ?? 0) + 1; // @step:increment-count
    frequencyMap.set(currentNum, updatedCount); // @step:increment-count
    if (updatedCount > threshold) {
      return currentNum; // @step:key-found
    }
  }
  return -1; // @step:complete
}
