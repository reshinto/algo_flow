// Set Permutations
// Generates all n! orderings of a set using backtracking with in-place swaps.
// Time: O(n × n!) — n! permutations each of length n
// Space: O(n × n!) for the result, O(n) call stack depth

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class SetPermutations {

    public static List<List<Integer>> setPermutations(int[] elements) {
        List<List<Integer>> result = new ArrayList<>(); // @step:initialize
        int[] working = Arrays.copyOf(elements, elements.length); // @step:initialize
        permute(working, 0, result);
        return result; // @step:complete
    }

    private static void permute(int[] working, int startIdx, List<List<Integer>> result) {
        if (startIdx == working.length) {
            List<Integer> permutation = Arrays.stream(working).boxed().collect(Collectors.toList());
            result.add(permutation); // @step:generate-permutation
            return;
        }

        for (int swapIdx = startIdx; swapIdx < working.length; swapIdx++) {
            // Swap working[startIdx] with working[swapIdx]
            int temp = working[startIdx];
            working[startIdx] = working[swapIdx]; // @step:backtrack
            working[swapIdx] = temp;
            permute(working, startIdx + 1, result);
            // Restore original order
            temp = working[startIdx];
            working[startIdx] = working[swapIdx]; // @step:backtrack
            working[swapIdx] = temp;
        }
    }
}
