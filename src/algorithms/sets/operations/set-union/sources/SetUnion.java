// Set Union using a Hash Set
// Returns all unique elements from both arrayA and arrayB.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n + m) for the hash set and result

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SetUnion {

    public static List<Integer> setUnion(int[] arrayA, int[] arrayB) {
        Set<Integer> hashSet = new HashSet<>(); // @step:initialize
        List<Integer> result = new ArrayList<>(); // @step:initialize

        // Phase 1: add all elements of array A to hash set and result
        for (int valueA : arrayA) {
            hashSet.add(valueA); // @step:add-to-set
            result.add(valueA);
        }

        // Phase 2: add elements of array B not already in the hash set
        for (int valueB : arrayB) {
            if (hashSet.contains(valueB)) {
                // valueB already in result — skip
                // no-op // @step:skip-element
            } else {
                // valueB is only in array B — add to result
                result.add(valueB); // @step:add-to-result
            }
        }

        return result; // @step:complete
    }
}
