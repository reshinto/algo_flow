import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Count-Min Sketch — probabilistic frequency estimation using a d×w counter matrix.
 * Supports sub-linear space frequency estimation with one-sided error (never undercounts).
 * Time: O(d) per insert/query — Space: O(d × w)
 */
public class CountMinSketch {

    private static int computeSketchHash(int value, int hashIdx, int width) {
        return Math.abs((value * (hashIdx * 1327 + 31) + hashIdx * 7919) % width); // @step:hash-element
    }

    public static Map<String, List<Map<String, Integer>>> countMinSketch(
        int[] elements,
        int[] queries,
        int width,
        int depth
    ) {
        // Initialize d×w counter matrix with all zeros
        int[][] sketch = new int[depth][width]; // @step:initialize

        // Insert phase: for each element, increment d counters
        for (int element : elements) {
            for (int hashIdx = 0; hashIdx < depth; hashIdx++) {
                int col = computeSketchHash(element, hashIdx, width);
                sketch[hashIdx][col]++; // @step:increment-count
            }
        }

        // Query phase: estimate frequency by taking minimum across all d rows
        List<Map<String, Integer>> results = new ArrayList<>();
        for (int query : queries) {
            int minCount = Integer.MAX_VALUE; // @step:check-membership
            for (int hashIdx = 0; hashIdx < depth; hashIdx++) {
                int col = computeSketchHash(query, hashIdx, width);
                if (sketch[hashIdx][col] < minCount) {
                    minCount = sketch[hashIdx][col];
                }
            }
            if (minCount > 0) {
                Map<String, Integer> entry = new HashMap<>();
                entry.put("value", query);
                entry.put("estimatedCount", minCount);
                results.add(entry); // @step:member-found
            }
            // @step:member-not-found
        }

        Map<String, List<Map<String, Integer>>> output = new HashMap<>();
        output.put("results", results);
        return output; // @step:complete
    }
}
