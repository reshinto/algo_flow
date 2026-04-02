// K-Combinations — Backtracking Generation
// Generates all C(n,k) subsets of exactly k elements from the input array.
// Time: O(k × C(n,k)) — generate C(n,k) combinations, each of length k
// Space: O(k × C(n,k)) — store all combinations

import java.util.ArrayList;
import java.util.List;

public class KCombinations {

    public static List<List<Integer>> kCombinations(int[] elements, int chooseK) {
        List<List<Integer>> result = new ArrayList<>(); // @step:initialize
        List<Integer> currentSubset = new ArrayList<>(); // @step:initialize

        backtrack(elements, 0, chooseK, currentSubset, result); // @step:initialize
        return result; // @step:complete
    }

    private static void backtrack(
            int[] elements,
            int startIdx,
            int chooseK,
            List<Integer> currentSubset,
            List<List<Integer>> result) {
        if (currentSubset.size() == chooseK) {
            result.add(new ArrayList<>(currentSubset)); // @step:generate-subset
            return;
        }

        for (int elemIdx = startIdx; elemIdx < elements.length; elemIdx++) {
            currentSubset.add(elements[elemIdx]); // @step:initialize
            backtrack(elements, elemIdx + 1, chooseK, currentSubset, result);
            currentSubset.remove(currentSubset.size() - 1); // @step:backtrack
        }
    }
}
