// Subarray Sum Equals K — O(n) via prefix sum + hash map
function subarraySumEqualsK(
  inputArray: number[],
  target: number,
): { count: number; subarrays: number[][] } {
  const prefixSumMap: Map<number, number> = new Map(); // @step:initialize
  prefixSumMap.set(0, 1); // @step:initialize

  let runningSum = 0; // @step:initialize
  let foundCount = 0; // @step:initialize
  const subarrays: number[][] = []; // @step:initialize

  for (let scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
    runningSum += inputArray[scanIndex]!; // @step:visit

    const lookupKey = runningSum - target; // @step:compare

    if (prefixSumMap.has(lookupKey)) {
      // @step:compare
      const matchCount = prefixSumMap.get(lookupKey)!;
      foundCount += matchCount; // @step:compare
      subarrays.push([lookupKey, scanIndex]); // @step:compare
    }

    prefixSumMap.set(runningSum, (prefixSumMap.get(runningSum) ?? 0) + 1); // @step:visit
  }

  return { count: foundCount, subarrays }; // @step:complete
}
