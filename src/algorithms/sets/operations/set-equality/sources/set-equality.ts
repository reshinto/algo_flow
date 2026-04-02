// Set Equality using a Hash Set
// Determines whether arrayA and arrayB contain exactly the same unique elements (A = B).
// Two sets are equal iff A ⊆ B and B ⊆ A, which implies equal unique element counts.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

function setEquality(arrayA: number[], arrayB: number[]): { isEqual: boolean } {
  const hashSet = new Set<number>(); // @step:initialize
  let uniqueCountA = 0;

  // Phase 1: build the hash set from arrayA, counting unique elements
  for (const valueA of arrayA) {
    if (!hashSet.has(valueA)) {
      uniqueCountA++;
    }
    hashSet.add(valueA); // @step:add-to-set
  }

  // Phase 2: check each element of arrayB for membership; count unique elements in B
  let uniqueCountB = 0;
  const seenInB = new Set<number>();

  for (const valueB of arrayB) {
    if (!seenInB.has(valueB)) {
      uniqueCountB++;
      seenInB.add(valueB);
    }

    if (hashSet.has(valueB)) {
      // valueB is present in arrayA — A ⊇ {valueB} holds so far
      void valueB; // @step:subset-pass
    } else {
      // valueB is missing from arrayA — sets cannot be equal
      return { isEqual: false }; // @step:subset-fail
    }
  }

  // Equal iff all B elements are in A and both have the same unique count
  const isEqual = uniqueCountA === uniqueCountB;
  return { isEqual }; // @step:complete
}
