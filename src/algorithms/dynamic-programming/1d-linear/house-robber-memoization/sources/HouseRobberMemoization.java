// House Robber memoization — top-down recursion with cached subproblems
import java.util.HashMap;
import java.util.Map;

public class HouseRobberMemoization {
    public static int houseRobberMemoization(int[] houses) { // @step:initialize
        if (houses.length == 0) return 0; // @step:initialize
        if (houses.length == 1) return houses[0]; // @step:initialize
        Map<Integer, Integer> memo = new HashMap<>(); // @step:initialize
        return rob(houses, houses.length - 1, memo);
    }

    private static int rob(int[] houses, int houseIndex, Map<Integer, Integer> memo) {
        if (houseIndex == 0) { // @step:fill-table
            memo.put(0, houses[0]); // @step:fill-table
            return houses[0]; // @step:fill-table
        }
        if (houseIndex == 1) { // @step:fill-table
            int baseValue = Math.max(houses[0], houses[1]); // @step:fill-table
            memo.put(1, baseValue); // @step:fill-table
            return baseValue; // @step:fill-table
        }
        if (memo.containsKey(houseIndex)) return memo.get(houseIndex); // @step:read-cache
        // Recursively compute skip vs rob decision and cache the result
        // @step:push-call
        int skipCurrent = rob(houses, houseIndex - 1, memo); // @step:compute-cell
        int robCurrent = rob(houses, houseIndex - 2, memo) + houses[houseIndex]; // @step:compute-cell
        int maxProfit = Math.max(skipCurrent, robCurrent); // @step:compute-cell
        memo.put(houseIndex, maxProfit); // @step:compute-cell
        return maxProfit; // @step:pop-call
    }
}
