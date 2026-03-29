// Coin Change Minimum — top-down memoization: find the fewest coins summing to target amount
import java.util.HashMap;
import java.util.Map;

public class CoinChangeMinMemoization {
    public static int coinChangeMinMemoization(int amount, int[] coins) { // @step:initialize
        if (amount == 0) return 0; // @step:initialize
        Map<Integer, Integer> memo = new HashMap<>(); // @step:initialize
        return minCoins(amount, coins, memo);
    }

    private static int minCoins(int remaining, int[] coins, Map<Integer, Integer> memo) {
        if (remaining == 0) { // @step:fill-table
            memo.put(0, 0); // @step:fill-table
            return 0; // @step:fill-table
        }
        if (remaining < 0) return -1; // @step:fill-table
        if (memo.containsKey(remaining)) return memo.get(remaining); // @step:read-cache
        // Recursively try each coin and cache the minimum result
        // @step:push-call
        int bestResult = -1;
        for (int coin : coins) { // @step:compute-cell
            int subResult = minCoins(remaining - coin, coins, memo); // @step:compute-cell
            if (subResult >= 0) { // @step:compute-cell
                int candidate = subResult + 1; // @step:compute-cell
                if (bestResult == -1 || candidate < bestResult) { // @step:compute-cell
                    bestResult = candidate; // @step:compute-cell
                }
            }
        }
        memo.put(remaining, bestResult); // @step:compute-cell
        return bestResult; // @step:pop-call
    }
}
