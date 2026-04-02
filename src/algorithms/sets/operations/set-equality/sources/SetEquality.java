// Set Equality using a Hash Set
// Determines whether arrayA and arrayB contain exactly the same unique elements (A = B).
// Two sets are equal iff A ⊆ B and B ⊆ A, which implies equal unique element counts.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

import java.util.HashSet;
import java.util.Set;

public class SetEquality {

    public static boolean setEquality(int[] arrayA, int[] arrayB) {
        Set<Integer> hashSet = new HashSet<>(); // @step:initialize
        int uniqueCountA = 0;

        // Phase 1: build the hash set from arrayA, counting unique elements
        for (int valueA : arrayA) {
            if (!hashSet.contains(valueA)) {
                uniqueCountA++;
            }
            hashSet.add(valueA); // @step:add-to-set
        }

        // Phase 2: check each element of arrayB for membership; count unique elements in B
        int uniqueCountB = 0;
        Set<Integer> seenInB = new HashSet<>();

        for (int valueB : arrayB) {
            if (!seenInB.contains(valueB)) {
                uniqueCountB++;
                seenInB.add(valueB);
            }

            if (hashSet.contains(valueB)) {
                // valueB is present in arrayA — A ⊇ {valueB} holds so far
                // no-op // @step:subset-pass
            } else {
                // valueB is missing from arrayA — sets cannot be equal
                return false; // @step:subset-fail
            }
        }

        // Equal iff all B elements are in A and both have the same unique count
        return uniqueCountA == uniqueCountB; // @step:complete
    }
}
