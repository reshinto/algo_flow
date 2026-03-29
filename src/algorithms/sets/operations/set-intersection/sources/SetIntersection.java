// Set Intersection using a Hash Set
// Returns all elements that appear in both arrayA and arrayB (no duplicates).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SetIntersection {

    public static List<Integer> setIntersection(int[] arrayA, int[] arrayB) {
        Set<Integer> hashSet = new HashSet<>(); // @step:initialize
        List<Integer> result = new ArrayList<>(); // @step:initialize

        // Phase 1: build the hash set from array A
        for (int valueA : arrayA) {
            hashSet.add(valueA); // @step:add-to-set
        }

        // Phase 2: check each element of array B for membership
        for (int valueB : arrayB) {
            if (hashSet.contains(valueB)) {
                // valueB is in both arrays
                result.add(valueB); // @step:member-found
                hashSet.remove(valueB); // prevent duplicate results
            } else {
                // valueB is only in array B
                // no-op // @step:member-not-found
            }
        }

        return result; // @step:complete
    }
}
