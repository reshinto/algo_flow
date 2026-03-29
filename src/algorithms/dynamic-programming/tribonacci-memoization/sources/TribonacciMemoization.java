// Tribonacci memoization — top-down recursion with cached subproblems
import java.util.HashMap;
import java.util.Map;

public class TribonacciMemoization {
    public static int tribonacciMemoization(int targetIndex) { // @step:initialize
        Map<Integer, Integer> memo = new HashMap<>(); // @step:initialize
        return solve(targetIndex, memo);
    }

    private static int solve(int targetIndex, Map<Integer, Integer> memo) {
        if (targetIndex == 0) return 0; // @step:initialize
        if (targetIndex <= 2) return 1; // @step:initialize
        if (memo.containsKey(targetIndex)) return memo.get(targetIndex); // @step:read-cache
        // Recursively compute the three preceding subproblems and cache the result
        int result =
            solve(targetIndex - 1, memo) + // @step:compute-cell
            solve(targetIndex - 2, memo) + // @step:compute-cell
            solve(targetIndex - 3, memo);  // @step:compute-cell
        memo.put(targetIndex, result); // @step:compute-cell
        return result; // @step:complete
    }
}
