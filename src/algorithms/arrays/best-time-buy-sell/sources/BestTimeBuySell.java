// Best Time to Buy and Sell Stock — O(n) single-pass maximum profit via min-price tracking
public class BestTimeBuySell {
    public static int[] bestTimeBuySell(int[] prices) {
        if (prices.length == 0) { // @step:initialize
            return new int[]{0, -1, -1}; // @step:initialize
        }

        int minPrice = prices[0]; // @step:initialize
        int maxProfit = 0; // @step:initialize
        int buyDay = 0;
        int sellDay = 0;
        int currentBuyDay = 0;

        for (int dayIndex = 1; dayIndex < prices.length; dayIndex++) {
            int currentPrice = prices[dayIndex]; // @step:compare

            if (currentPrice < minPrice) { // @step:compare
                minPrice = currentPrice; // @step:visit
                currentBuyDay = dayIndex; // @step:visit
            }

            int potentialProfit = currentPrice - minPrice; // @step:compare

            if (potentialProfit > maxProfit) { // @step:compare
                maxProfit = potentialProfit; // @step:visit
                buyDay = currentBuyDay; // @step:visit
                sellDay = dayIndex; // @step:visit
            }
        }

        return new int[]{maxProfit, buyDay, sellDay}; // @step:complete
    }
}
