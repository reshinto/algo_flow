// Fibonacci memoization — top-down recursion with cached subproblems
import java.util.HashMap;
import java.util.Map;

public class FibonacciMemoization {
    public static int fibonacciMemoization(int targetIndex) { // @step:initialize
        Map<Integer, Integer> memo = new HashMap<>(); // @step:initialize
        return solve(targetIndex, memo);
    }

    private static int solve(int targetIndex, Map<Integer, Integer> memo) {
        if (targetIndex <= 1) return targetIndex; // @step:initialize
        if (memo.containsKey(targetIndex)) return memo.get(targetIndex); // @step:read-cache
        // Recursively compute subproblems and cache the result to avoid recomputation
        int result =
            solve(targetIndex - 1, memo) + // @step:compute-cell
            solve(targetIndex - 2, memo);  // @step:compute-cell
        memo.put(targetIndex, result); // @step:compute-cell
        return result; // @step:complete
    }
}
