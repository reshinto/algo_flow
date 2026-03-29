// Coin Change (Min Coins) tabulation — find minimum coins needed to make amount
import java.util.Arrays;

public class CoinChangeMinTabulation {
    public static int coinChangeMinTabulation(int amount, int[] coins) { // @step:initialize
        int tableSize = amount + 1; // @step:initialize
        int[] dpTable = new int[tableSize]; // @step:initialize,fill-table
        Arrays.fill(dpTable, Integer.MAX_VALUE); // @step:initialize,fill-table
        dpTable[0] = 0; // @step:fill-table
        // For each amount, try every coin and take the minimum
        for (int currentAmount = 1; currentAmount <= amount; currentAmount++) { // @step:compute-cell
            for (int coin : coins) {
                if (currentAmount >= coin && dpTable[currentAmount - coin] != Integer.MAX_VALUE) { // @step:read-cache
                    int candidate = dpTable[currentAmount - coin] + 1; // @step:read-cache
                    if (candidate < dpTable[currentAmount]) {
                        dpTable[currentAmount] = candidate; // @step:compute-cell
                    }
                }
            }
        }
        return dpTable[amount] == Integer.MAX_VALUE ? -1 : dpTable[amount]; // @step:complete
    }
}
