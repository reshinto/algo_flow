// Set Complement using a Hash Set
// Returns all elements in the universal set U that are NOT in set A.
// Complement = U \ A
// Time: O(n + u) — O(n) to build the set from A, O(u) to scan the universal set
// Space: O(n) for the hash set

function setComplement(arrayA: number[], universalSet: number[]): number[] {
  const hashSet = new Set<number>(); // @step:initialize
  const result: number[] = []; // @step:initialize

  // Phase 1: build the hash set from array A
  for (const valueA of arrayA) {
    hashSet.add(valueA); // @step:add-to-set
  }

  // Phase 2: collect elements in the universal set that are NOT in A
  for (const valueU of universalSet) {
    if (hashSet.has(valueU)) {
      // valueU is in A, so skip it
      void valueU; // @step:skip-element
    } else {
      // valueU is not in A — it belongs to the complement
      result.push(valueU); // @step:add-to-result
    }
  }

  return result; // @step:complete
}
