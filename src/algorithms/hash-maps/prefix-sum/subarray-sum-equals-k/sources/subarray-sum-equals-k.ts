// Subarray Sum Equals K — count subarrays whose elements sum to the target using prefix sums and a hash map
function subarraySumEqualsK(numbers: number[], target: number): number {
  const prefixCounts = new Map<number, number>(); // @step:initialize
  prefixCounts.set(0, 1); // @step:initialize
  let currentSum = 0;
  let totalCount = 0;
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    currentSum += numbers[elementIndex]!; // @step:check-prefix
    const needed = currentSum - target; // @step:check-prefix
    if (prefixCounts.has(needed)) {
      // @step:prefix-found
      totalCount += prefixCounts.get(needed)!; // @step:prefix-found
    }
    // Store the running prefix sum count for future lookups
    prefixCounts.set(currentSum, (prefixCounts.get(currentSum) ?? 0) + 1); // @step:increment-count
  }
  return totalCount; // @step:complete
}
