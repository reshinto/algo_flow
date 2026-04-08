// LIS (Longest Increasing Subsequence) memoization — top-down recursion with cached subproblems

function lisMemoization(sequence: number[]): number {
  // @step:initialize
  const sequenceLength = sequence.length; // @step:initialize
  if (sequenceLength === 0) return 0; // @step:initialize

  const memo = new Map<number, number>(); // @step:initialize

  function lis(startIndex: number): number {
    if (memo.has(startIndex)) return memo.get(startIndex)!; // @step:read-cache
    // @step:push-call
    let maxLength = 1; // @step:compute-cell
    for (let nextIndex = startIndex + 1; nextIndex < sequenceLength; nextIndex++) {
      // @step:compute-cell
      if (sequence[nextIndex]! > sequence[startIndex]!) {
        // @step:compute-cell
        const subLength = 1 + lis(nextIndex); // @step:compute-cell
        if (subLength > maxLength) {
          // @step:compute-cell
          maxLength = subLength; // @step:compute-cell
        }
      }
    }
    memo.set(startIndex, maxLength); // @step:compute-cell
    return maxLength; // @step:pop-call
  }

  let result = 0; // @step:compute-cell
  for (let startIndex = 0; startIndex < sequenceLength; startIndex++) {
    // @step:compute-cell
    const lisLength = lis(startIndex); // @step:compute-cell
    if (lisLength > result) {
      // @step:compute-cell
      result = lisLength; // @step:compute-cell
    }
  }

  return result; // @step:complete
}
