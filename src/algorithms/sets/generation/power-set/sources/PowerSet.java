// Power Set — Backtracking Generation
// Generates all 2^n subsets of the input elements by choosing to include or exclude each element.
// Time: O(n × 2^n) — generate 2^n subsets, each of length up to n
// Space: O(n × 2^n) — store all subsets

import java.util.ArrayList;
import java.util.List;

public class PowerSet {

    public static List<List<Integer>> powerSet(int[] elements) {
        List<List<Integer>> result = new ArrayList<>(); // @step:initialize
        List<Integer> currentSubset = new ArrayList<>(); // @step:initialize

        backtrack(elements, 0, currentSubset, result); // @step:initialize
        return result; // @step:complete
    }

    private static void backtrack(
            int[] elements,
            int startIdx,
            List<Integer> currentSubset,
            List<List<Integer>> result) {
        result.add(new ArrayList<>(currentSubset)); // @step:generate-subset

        for (int elemIdx = startIdx; elemIdx < elements.length; elemIdx++) {
            currentSubset.add(elements[elemIdx]); // @step:initialize
            backtrack(elements, elemIdx + 1, currentSubset, result);
            currentSubset.remove(currentSubset.size() - 1); // @step:backtrack
        }
    }
}
