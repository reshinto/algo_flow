// LIS (Longest Increasing Subsequence) memoization — top-down recursion with cached subproblems
import java.util.HashMap;
import java.util.Map;

public class LisMemoization {
    public static int lisMemoization(int[] sequence) { // @step:initialize
        int sequenceLength = sequence.length; // @step:initialize
        if (sequenceLength == 0) return 0; // @step:initialize
        Map<Integer, Integer> memo = new HashMap<>(); // @step:initialize
        int result = 0; // @step:compute-cell
        for (int startIndex = 0; startIndex < sequenceLength; startIndex++) { // @step:compute-cell
            int lisLength = lis(sequence, sequenceLength, startIndex, memo); // @step:compute-cell
            if (lisLength > result) { // @step:compute-cell
                result = lisLength; // @step:compute-cell
            }
        }
        return result; // @step:complete
    }

    private static int lis(int[] sequence, int sequenceLength, int startIndex, Map<Integer, Integer> memo) {
        if (memo.containsKey(startIndex)) return memo.get(startIndex); // @step:read-cache
        // @step:push-call
        int maxLength = 1; // @step:compute-cell
        for (int nextIndex = startIndex + 1; nextIndex < sequenceLength; nextIndex++) { // @step:compute-cell
            if (sequence[nextIndex] > sequence[startIndex]) { // @step:compute-cell
                int subLength = 1 + lis(sequence, sequenceLength, nextIndex, memo); // @step:compute-cell
                if (subLength > maxLength) { // @step:compute-cell
                    maxLength = subLength; // @step:compute-cell
                }
            }
        }
        memo.put(startIndex, maxLength); // @step:compute-cell
        return maxLength; // @step:pop-call
    }
}
