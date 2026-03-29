// Integer Break memoization — top-down recursion to maximize product of parts

export function integerBreakMemoization(
  targetNumber: number,
  memo: Map<number, number> = new Map(),
): number {
  // @step:initialize
  if (targetNumber === 1) return 1; // @step:initialize

  if (memo.has(targetNumber)) return memo.get(targetNumber)!; // @step:read-cache
  // @step:push-call
  let maxProduct = 0; // @step:compute-cell
  for (let partSize = 1; partSize < targetNumber; partSize++) {
    // @step:compute-cell
    const remainder = targetNumber - partSize; // @step:compute-cell
    const splitProduct = partSize * remainder; // @step:compute-cell
    const recurseProduct = partSize * integerBreakMemoization(remainder, memo); // @step:compute-cell
    maxProduct = Math.max(maxProduct, splitProduct, recurseProduct); // @step:compute-cell
  }
  memo.set(targetNumber, maxProduct); // @step:compute-cell
  return maxProduct; // @step:pop-call
}
