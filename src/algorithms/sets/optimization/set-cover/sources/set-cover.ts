// Greedy Set Cover approximation
// Finds the minimum number of subsets that cover all elements of the universe.
// Time: O(n × m) where n = |universe|, m = |sets|
// Space: O(n + m) for the uncovered set and selected sets tracking

function setCover(
  universe: number[],
  sets: number[][],
): { selectedIndices: number[]; selectedSets: number[][] } {
  const uncovered = new Set(universe); // @step:initialize
  const selectedIndices: number[] = [];
  const selectedSets: number[][] = [];

  while (uncovered.size > 0) {
    // @step:evaluate-set
    let bestSetIdx = -1;
    let bestCoverage = 0;

    for (let setIdx = 0; setIdx < sets.length; setIdx++) {
      const candidateSet = sets[setIdx]!;
      const coverage = candidateSet.filter((elem) => uncovered.has(elem)).length; // @step:evaluate-set
      if (coverage > bestCoverage) {
        bestCoverage = coverage;
        bestSetIdx = setIdx;
      }
    }

    if (bestSetIdx === -1) break;

    const chosenSet = sets[bestSetIdx]!;
    selectedIndices.push(bestSetIdx); // @step:select-set
    selectedSets.push(chosenSet);

    for (const element of chosenSet) {
      uncovered.delete(element); // @step:cover-elements
    }
  }

  return { selectedIndices, selectedSets }; // @step:complete
}
