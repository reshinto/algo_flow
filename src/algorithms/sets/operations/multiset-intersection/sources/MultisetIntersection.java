// Multiset Intersection (Bag Intersection) using frequency Maps
// For each element, take the MIN count from arrayA and arrayB.
// Time: O(n + m) — one pass over each array plus iteration over shared keys
// Space: O(n + m) for the two frequency maps

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MultisetIntersection {

    public static List<Integer> multisetIntersection(int[] arrayA, int[] arrayB) {
        Map<Integer, Integer> countsA = new HashMap<>(); // @step:initialize
        Map<Integer, Integer> countsB = new HashMap<>(); // @step:initialize
        List<Integer> result = new ArrayList<>(); // @step:initialize

        // Phase 1: count frequencies in arrayA
        for (int valueA : arrayA) {
            countsA.merge(valueA, 1, Integer::sum); // @step:count-element
        }

        // Phase 2: count frequencies in arrayB
        for (int valueB : arrayB) {
            countsB.merge(valueB, 1, Integer::sum); // @step:count-element
        }

        // Phase 3: for each element in A, take min(countA, countB) copies
        for (Map.Entry<Integer, Integer> entry : countsA.entrySet()) {
            int value = entry.getKey();
            int countA = entry.getValue();
            int countB = countsB.getOrDefault(value, 0);
            int minCount = Math.min(countA, countB); // @step:compare-count
            for (int copyIdx = 0; copyIdx < minCount; copyIdx++) {
                result.add(value); // @step:add-to-result
            }
        }

        Collections.sort(result);
        return result; // @step:complete
    }
}
