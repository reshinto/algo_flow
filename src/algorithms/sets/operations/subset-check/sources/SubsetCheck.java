// Subset Check using a Hash Set
// Determines whether every element of arrayA also appears in arrayB (A ⊆ B).
// Time: O(n + m) — O(m) to build the set, O(n) to check membership
// Space: O(m) for the hash set

import java.util.HashSet;
import java.util.Set;

public class SubsetCheck {

    public static boolean subsetCheck(int[] arrayA, int[] arrayB) {
        Set<Integer> hashSet = new HashSet<>(); // @step:initialize

        // Phase 1: build the hash set from arrayB
        for (int valueB : arrayB) {
            hashSet.add(valueB); // @step:add-to-set
        }

        // Phase 2: check each element of arrayA for membership in the hash set
        for (int valueA : arrayA) {
            if (hashSet.contains(valueA)) {
                // valueA is present in arrayB — condition holds so far
                // no-op // @step:subset-pass
            } else {
                // valueA is missing from arrayB — A is not a subset of B
                return false; // @step:subset-fail
            }
        }

        return true; // @step:complete
    }
}
