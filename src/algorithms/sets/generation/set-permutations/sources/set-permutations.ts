// Set Permutations
// Generates all n! orderings of a set using backtracking with in-place swaps.
// Time: O(n × n!) — n! permutations each of length n
// Space: O(n × n!) for the result, O(n) call stack depth

function setPermutations(elements: number[]): number[][] {
  const result: number[][] = []; // @step:initialize
  const working = [...elements]; // @step:initialize

  function permute(startIdx: number): void {
    if (startIdx === working.length) {
      result.push([...working]); // @step:generate-permutation
      return;
    }

    for (let swapIdx = startIdx; swapIdx < working.length; swapIdx++) {
      // Swap elements[startIdx] with elements[swapIdx]
      [working[startIdx], working[swapIdx]] = [working[swapIdx]!, working[startIdx]!]; // @step:backtrack
      permute(startIdx + 1);
      // Restore original order
      [working[startIdx], working[swapIdx]] = [working[swapIdx]!, working[startIdx]!]; // @step:backtrack
    }
  }

  permute(0);
  return result; // @step:complete
}
