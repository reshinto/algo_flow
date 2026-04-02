// Set Difference using a Hash Set
// Returns all elements in arrayA that are NOT in arrayB (A \ B).
// Time: O(n + m) — O(m) to build the set, O(n) to filter
// Space: O(m) for the hash set

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SetDifference {

    public static List<Integer> setDifference(int[] arrayA, int[] arrayB) {
        Set<Integer> hashSet = new HashSet<>(); // @step:initialize
        List<Integer> result = new ArrayList<>(); // @step:initialize

        // Phase 1: build the hash set from array B
        for (int valueB : arrayB) {
            hashSet.add(valueB); // @step:add-to-set
        }

        // Phase 2: include only elements of array A not in the hash set
        for (int valueA : arrayA) {
            if (hashSet.contains(valueA)) {
                // valueA exists in B — exclude from result
                // no-op // @step:skip-element
            } else {
                // valueA is only in A — include in result
                result.add(valueA); // @step:add-to-result
            }
        }

        return result; // @step:complete
    }
}
