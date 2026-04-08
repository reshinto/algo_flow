// Four Sum II — count tuples (i,j,k,l) such that A[i]+B[j]+C[k]+D[l] === 0
function fourSumII(numsA: number[], numsB: number[], numsC: number[], numsD: number[]): number {
  const pairSumCounts = new Map<number, number>(); // @step:initialize

  // Phase 1: build map of all A+B pair sums with their occurrence counts
  for (let outerIndex = 0; outerIndex < numsA.length; outerIndex++) {
    for (let innerIndex = 0; innerIndex < numsB.length; innerIndex++) {
      const pairSum = numsA[outerIndex]! + numsB[innerIndex]!;
      if (pairSumCounts.has(pairSum)) {
        pairSumCounts.set(pairSum, pairSumCounts.get(pairSum)! + 1); // @step:increment-count
      } else {
        pairSumCounts.set(pairSum, 1); // @step:insert-key
      }
    }
  }

  // Phase 2: for each C+D pair, check if its negation exists in the map
  let tupleCount = 0;
  for (let outerIndex = 0; outerIndex < numsC.length; outerIndex++) {
    for (let innerIndex = 0; innerIndex < numsD.length; innerIndex++) {
      const complement = -(numsC[outerIndex]! + numsD[innerIndex]!);
      if (pairSumCounts.has(complement)) {
        // @step:key-found
        tupleCount += pairSumCounts.get(complement)!; // @step:key-found
      }
      // @step:key-not-found
    }
  }

  return tupleCount; // @step:complete
}
