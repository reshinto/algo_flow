// Best Time Buy/Sell (Unlimited) — O(n) greedy: capture every upward price slope
import java.util.ArrayList;
import java.util.List;

public class BestTimeBuySellUnlimited {
    public static int bestTimeBuySellUnlimited(int[] prices) {
        if (prices.length <= 1) { // @step:initialize
            return 0; // @step:initialize
        }

        int totalProfit = 0; // @step:initialize
        int buyDay = -1; // @step:initialize

        for (int dayIndex = 1; dayIndex < prices.length; dayIndex++) {
            int previousPrice = prices[dayIndex - 1]; // @step:compare
            int currentPrice = prices[dayIndex]; // @step:compare

            if (currentPrice > previousPrice) { // @step:compare — rising: open buy if not in trade
                if (buyDay == -1) { // @step:compare
                    buyDay = dayIndex - 1; // @step:visit
                }
            } else {
                if (buyDay != -1) { // @step:compare — falling: close open trade
                    int profit = previousPrice - prices[buyDay]; // @step:visit
                    totalProfit += profit; // @step:visit
                    buyDay = -1; // @step:visit
                }
            }
        }

        // Close any remaining open trade at the last day
        if (buyDay != -1) { // @step:compare
            int profit = prices[prices.length - 1] - prices[buyDay]; // @step:visit
            totalProfit += profit; // @step:visit
        }

        return totalProfit; // @step:complete
    }
}
