// Min Cost Climbing Stairs memoization — top-down recursion with cached subproblems
import java.util.HashMap;
import java.util.Map;

public class MinCostClimbingStairsMemoization {
    public static int minCostClimbingStairsMemoization(int[] costs) { // @step:initialize
        Map<Integer, Integer> memo = new HashMap<>(); // @step:initialize
        return computeMemo(costs.length, costs, memo);
    }

    private static int computeMemo(int step, int[] costs, Map<Integer, Integer> memo) {
        if (step <= 1) return 0; // @step:initialize
        if (memo.containsKey(step)) return memo.get(step); // @step:read-cache
        // Recursively compute the minimum cost from each of the two preceding steps, cache to avoid recomputation
        // @step:push-call
        int costFromOne = computeMemo(step - 1, costs, memo) + costs[step - 1]; // @step:compute-cell
        int costFromTwo = computeMemo(step - 2, costs, memo) + costs[step - 2]; // @step:compute-cell
        int result = Math.min(costFromOne, costFromTwo); // @step:compute-cell
        memo.put(step, result); // @step:compute-cell
        // @step:pop-call
        return result; // @step:complete
    }
}
