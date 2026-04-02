// Set Union using a Hash Set
// Returns all unique elements from both arrayA and arrayB.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n + m) for the hash set and result

function setUnion(arrayA: number[], arrayB: number[]): number[] {
  const hashSet = new Set<number>(); // @step:initialize
  const result: number[] = []; // @step:initialize

  // Phase 1: add all elements of array A to hash set and result
  for (const valueA of arrayA) {
    hashSet.add(valueA); // @step:add-to-set
    result.push(valueA);
  }

  // Phase 2: add elements of array B that are not already in the hash set
  for (const valueB of arrayB) {
    if (hashSet.has(valueB)) {
      // valueB already in result — skip
      void valueB; // @step:skip-element
    } else {
      // valueB is only in array B — add to result
      result.push(valueB); // @step:add-to-result
    }
  }

  return result; // @step:complete
}
