// Set Complement using a Hash Set
// Returns all elements in the universal set U that are NOT in set A.
// Complement = U \ A
// Time: O(n + u) — O(n) to build the set from A, O(u) to scan the universal set
// Space: O(n) for the hash set

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SetComplement {

    public static List<Integer> setComplement(int[] arrayA, int[] universalSet) {
        Set<Integer> hashSet = new HashSet<>(); // @step:initialize
        List<Integer> result = new ArrayList<>(); // @step:initialize

        // Phase 1: build the hash set from array A
        for (int valueA : arrayA) {
            hashSet.add(valueA); // @step:add-to-set
        }

        // Phase 2: collect elements in the universal set that are NOT in A
        for (int valueU : universalSet) {
            if (hashSet.contains(valueU)) {
                // valueU is in A, so skip it
                // no-op // @step:skip-element
            } else {
                // valueU is not in A — it belongs to the complement
                result.add(valueU); // @step:add-to-result
            }
        }

        return result; // @step:complete
    }
}
