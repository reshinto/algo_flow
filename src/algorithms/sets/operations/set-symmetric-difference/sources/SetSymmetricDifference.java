// Set Symmetric Difference using a Hash Set
// Returns all elements in either arrayA or arrayB, but NOT in both (A △ B).
// Time: O(n + m) — O(n) to build the set, O(m) to process B, O(n) to collect remaining
// Space: O(n) for the hash set

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SetSymmetricDifference {

    public static List<Integer> setSymmetricDifference(int[] arrayA, int[] arrayB) {
        Set<Integer> hashSet = new HashSet<>(); // @step:initialize
        List<Integer> result = new ArrayList<>(); // @step:initialize

        // Phase 1: build the hash set from array A
        for (int valueA : arrayA) {
            hashSet.add(valueA); // @step:add-to-set
        }

        // Phase 2: process array B — remove common elements, add unique ones
        for (int valueB : arrayB) {
            if (hashSet.contains(valueB)) {
                // valueB is in both arrays — remove it (common element)
                hashSet.remove(valueB); // @step:skip-element
            } else {
                // valueB is only in B — add to result
                result.add(valueB); // @step:add-to-result
            }
        }

        // Phase 3: remaining elements in hash set are only in A
        for (int remaining : hashSet) {
            result.add(remaining); // @step:add-to-result
        }

        return result; // @step:complete
    }
}
