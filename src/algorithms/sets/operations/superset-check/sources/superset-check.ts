// Superset Check using a Hash Set
// Determines whether every element of arrayB also appears in arrayA (A ⊇ B).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

function supersetCheck(arrayA: number[], arrayB: number[]): { isSuperset: boolean } {
  const hashSet = new Set<number>(); // @step:initialize

  // Phase 1: build the hash set from arrayA
  for (const valueA of arrayA) {
    hashSet.add(valueA); // @step:add-to-set
  }

  // Phase 2: check each element of arrayB for membership in the hash set
  for (const valueB of arrayB) {
    if (hashSet.has(valueB)) {
      // valueB is present in arrayA — condition holds so far
      void valueB; // @step:subset-pass
    } else {
      // valueB is missing from arrayA — A is not a superset of B
      return { isSuperset: false }; // @step:subset-fail
    }
  }

  return { isSuperset: true }; // @step:complete
}
