// Superset Check using a Hash Set
// Determines whether every element of arrayB also appears in arrayA (A ⊇ B).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

import java.util.HashSet;
import java.util.Set;

public class SupersetCheck {

    public static boolean supersetCheck(int[] arrayA, int[] arrayB) {
        Set<Integer> hashSet = new HashSet<>(); // @step:initialize

        // Phase 1: build the hash set from arrayA
        for (int valueA : arrayA) {
            hashSet.add(valueA); // @step:add-to-set
        }

        // Phase 2: check each element of arrayB for membership in the hash set
        for (int valueB : arrayB) {
            if (hashSet.contains(valueB)) {
                // valueB is present in arrayA — condition holds so far
                // no-op // @step:subset-pass
            } else {
                // valueB is missing from arrayA — A is not a superset of B
                return false; // @step:subset-fail
            }
        }

        return true; // @step:complete
    }
}
