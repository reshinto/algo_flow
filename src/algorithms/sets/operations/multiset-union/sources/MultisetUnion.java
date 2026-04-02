// Multiset Union (Bag Union) using frequency Maps
// For each element, take the MAX count from arrayA and arrayB.
// Time: O(n + m) — one pass over each array plus iteration over unique keys
// Space: O(n + m) for the two frequency maps

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class MultisetUnion {

    public static List<Integer> multisetUnion(int[] arrayA, int[] arrayB) {
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

        // Phase 3: for each unique element take max(countA, countB) copies
        Set<Integer> allKeys = new HashSet<>(countsA.keySet());
        allKeys.addAll(countsB.keySet());
        for (int value : allKeys) {
            int countA = countsA.getOrDefault(value, 0);
            int countB = countsB.getOrDefault(value, 0);
            int maxCount = Math.max(countA, countB); // @step:compare-count
            for (int copyIdx = 0; copyIdx < maxCount; copyIdx++) {
                result.add(value); // @step:add-to-result
            }
        }

        Collections.sort(result);
        return result; // @step:complete
    }
}
