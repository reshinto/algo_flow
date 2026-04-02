// K-Combinations — Backtracking Generation
// Generates all C(n,k) subsets of exactly k elements from the input array.
// Time: O(k × C(n,k)) — generate C(n,k) combinations, each of length k
// Space: O(k × C(n,k)) — store all combinations

function kCombinations(elements: number[], chooseK: number): number[][] {
  const result: number[][] = []; // @step:initialize
  const currentSubset: number[] = []; // @step:initialize

  function backtrack(startIdx: number): void {
    if (currentSubset.length === chooseK) {
      result.push([...currentSubset]); // @step:generate-subset
      return;
    }

    for (let elemIdx = startIdx; elemIdx < elements.length; elemIdx++) {
      currentSubset.push(elements[elemIdx]!); // @step:initialize
      backtrack(elemIdx + 1);
      currentSubset.pop(); // @step:backtrack
    }
  }

  backtrack(0); // @step:initialize
  return result; // @step:complete
}
