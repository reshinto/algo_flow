// N-Repeated Element — find the element repeated n times in an array of size 2n
function nRepeatedElement(numbers: number[]): number {
  const frequencyMap = new Map<number, number>(); // @step:initialize
  const targetCount = numbers.length / 2;
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!;
    const updatedCount = (frequencyMap.get(currentNum) ?? 0) + 1; // @step:increment-count
    frequencyMap.set(currentNum, updatedCount);
    if (updatedCount === targetCount) return currentNum; // @step:key-found
  }
  return -1; // @step:complete
}
