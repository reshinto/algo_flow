// Multiset Intersection (Bag Intersection) using frequency Maps
// For each element, take the MIN count from arrayA and arrayB.
// Time: O(n + m) — one pass over each array plus iteration over shared keys
// Space: O(n + m) for the two frequency maps

function multisetIntersection(arrayA: number[], arrayB: number[]): number[] {
  const countsA = new Map<number, number>(); // @step:initialize
  const countsB = new Map<number, number>(); // @step:initialize
  const result: number[] = []; // @step:initialize

  // Phase 1: count frequencies in arrayA
  for (const valueA of arrayA) {
    countsA.set(valueA, (countsA.get(valueA) ?? 0) + 1); // @step:count-element
  }

  // Phase 2: count frequencies in arrayB
  for (const valueB of arrayB) {
    countsB.set(valueB, (countsB.get(valueB) ?? 0) + 1); // @step:count-element
  }

  // Phase 3: for each element in A, take min(countA, countB) copies
  for (const [value, countA] of countsA) {
    const countB = countsB.get(value) ?? 0;
    const minCount = Math.min(countA, countB); // @step:compare-count
    for (let copyIdx = 0; copyIdx < minCount; copyIdx++) {
      result.push(value); // @step:add-to-result
    }
  }

  result.sort((numA, numB) => numA - numB);
  return result; // @step:complete
}
