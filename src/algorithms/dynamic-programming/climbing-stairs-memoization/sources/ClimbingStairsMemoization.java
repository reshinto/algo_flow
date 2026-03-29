// Climbing stairs memoization — top-down recursion with cached subproblems
import java.util.HashMap;
import java.util.Map;

public class ClimbingStairsMemoization {
    public static int climbingStairsMemoization(int numberOfStairs) { // @step:initialize
        Map<Integer, Integer> memo = new HashMap<>(); // @step:initialize
        return solve(numberOfStairs, memo);
    }

    private static int solve(int numberOfStairs, Map<Integer, Integer> memo) {
        if (numberOfStairs <= 1) return 1; // @step:initialize
        if (memo.containsKey(numberOfStairs)) return memo.get(numberOfStairs); // @step:read-cache
        // Recursively count distinct ways from the previous two steps, cache to avoid recomputation
        // @step:push-call
        int result =
            solve(numberOfStairs - 1, memo) + // @step:compute-cell
            solve(numberOfStairs - 2, memo);  // @step:compute-cell
        memo.put(numberOfStairs, result); // @step:compute-cell
        // @step:pop-call
        return result; // @step:complete
    }
}
