// Set Difference using a Hash Set
// Returns all elements in arrayA that are NOT in arrayB (A \ B).
// Time: O(n + m) — O(m) to build the set, O(n) to filter
// Space: O(m) for the hash set

function setDifference(arrayA: number[], arrayB: number[]): number[] {
  const hashSet = new Set<number>(); // @step:initialize
  const result: number[] = []; // @step:initialize

  // Phase 1: build the hash set from array B
  for (const valueB of arrayB) {
    hashSet.add(valueB); // @step:add-to-set
  }

  // Phase 2: include only elements of array A not found in the hash set
  for (const valueA of arrayA) {
    if (hashSet.has(valueA)) {
      // valueA exists in B — exclude from result
      void valueA; // @step:skip-element
    } else {
      // valueA is only in A — include in result
      result.push(valueA); // @step:add-to-result
    }
  }

  return result; // @step:complete
}
