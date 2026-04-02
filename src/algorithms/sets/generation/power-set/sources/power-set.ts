// Power Set — Backtracking Generation
// Generates all 2^n subsets of the input elements by choosing to include or exclude each element.
// Time: O(n × 2^n) — generate 2^n subsets, each of length up to n
// Space: O(n × 2^n) — store all subsets

function powerSet(elements: number[]): number[][] {
  const result: number[][] = []; // @step:initialize
  const currentSubset: number[] = []; // @step:initialize

  function backtrack(startIdx: number): void {
    result.push([...currentSubset]); // @step:generate-subset

    for (let elemIdx = startIdx; elemIdx < elements.length; elemIdx++) {
      currentSubset.push(elements[elemIdx]!); // @step:initialize
      backtrack(elemIdx + 1); // recurse with next element
      currentSubset.pop(); // @step:backtrack
    }
  }

  backtrack(0); // @step:initialize
  return result; // @step:complete
}
