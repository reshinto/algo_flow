// Set Symmetric Difference using a Hash Set
// Returns all elements in either arrayA or arrayB, but NOT in both (A △ B).
// Time: O(n + m) — O(n) to build the set, O(m) to process B, O(n) to collect remaining
// Space: O(n) for the hash set

function setSymmetricDifference(arrayA: number[], arrayB: number[]): number[] {
  const hashSet = new Set<number>(); // @step:initialize
  const result: number[] = []; // @step:initialize

  // Phase 1: build the hash set from array A
  for (const valueA of arrayA) {
    hashSet.add(valueA); // @step:add-to-set
  }

  // Phase 2: process array B — remove common elements, add unique ones to result
  for (const valueB of arrayB) {
    if (hashSet.has(valueB)) {
      // valueB is in both arrays — remove it (common element, excluded from result)
      hashSet.delete(valueB); // @step:skip-element
    } else {
      // valueB is only in B — add to result
      result.push(valueB); // @step:add-to-result
    }
  }

  // Phase 3: remaining elements in hash set are only in A — add to result
  for (const remaining of hashSet) {
    result.push(remaining); // @step:add-to-result
  }

  return result; // @step:complete
}
