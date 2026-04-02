// Multiset Union (Bag Union) using frequency Maps
// For each element, take the MAX count from arrayA and arrayB.
// Time: O(n + m) — one pass over each array plus iteration over unique keys
// Space: O(n + m) for the two frequency maps

function multisetUnion(arrayA: number[], arrayB: number[]): number[] {
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

  // Phase 3: for each unique element take max(countA, countB) copies
  const allKeys = new Set([...countsA.keys(), ...countsB.keys()]);
  for (const value of allKeys) {
    const countA = countsA.get(value) ?? 0;
    const countB = countsB.get(value) ?? 0;
    const maxCount = Math.max(countA, countB); // @step:compare-count
    for (let copyIdx = 0; copyIdx < maxCount; copyIdx++) {
      result.push(value); // @step:add-to-result
    }
  }

  result.sort((numA, numB) => numA - numB);
  return result; // @step:complete
}
