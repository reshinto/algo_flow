// Set Intersection using a Hash Set
// Returns all elements that appear in both arrayA and arrayB (no duplicates).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

function setIntersection(arrayA: number[], arrayB: number[]): number[] {
  const hashSet = new Set<number>(); // @step:initialize
  const result: number[] = []; // @step:initialize

  // Phase 1: build the hash set from array A
  for (const valueA of arrayA) {
    hashSet.add(valueA); // @step:add-to-set
  }

  // Phase 2: check each element of array B for membership
  for (const valueB of arrayB) {
    if (hashSet.has(valueB)) {
      // valueB is in both arrays
      result.push(valueB); // @step:member-found
      hashSet.delete(valueB); // prevent duplicate results
    } else {
      // valueB is only in array B
      void valueB; // @step:member-not-found
    }
  }

  return result; // @step:complete
}
