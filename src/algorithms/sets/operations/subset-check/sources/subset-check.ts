// Subset Check using a Hash Set
// Determines whether every element of arrayA also appears in arrayB (A ⊆ B).
// Time: O(n + m) — O(m) to build the set, O(n) to check membership
// Space: O(m) for the hash set

function subsetCheck(arrayA: number[], arrayB: number[]): { isSubset: boolean } {
  const hashSet = new Set<number>(); // @step:initialize

  // Phase 1: build the hash set from arrayB
  for (const valueB of arrayB) {
    hashSet.add(valueB); // @step:add-to-set
  }

  // Phase 2: check each element of arrayA for membership in the hash set
  for (const valueA of arrayA) {
    if (hashSet.has(valueA)) {
      // valueA is present in arrayB — condition holds so far
      void valueA; // @step:subset-pass
    } else {
      // valueA is missing from arrayB — A is not a subset of B
      return { isSubset: false }; // @step:subset-fail
    }
  }

  return { isSubset: true }; // @step:complete
}
