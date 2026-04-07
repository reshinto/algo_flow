// Best Time Buy/Sell (Unlimited) — O(n) greedy: capture every upward price slope
#include <vector>
#include <utility>

std::pair<int, std::vector<std::pair<int,int>>> bestTimeBuySellUnlimited(const std::vector<int>& prices) {
    if ((int)prices.size() <= 1) {
        // @step:initialize
        return {0, {}}; // @step:initialize
    }

    int totalProfit = 0; // @step:initialize
    std::vector<std::pair<int,int>> transactions; // @step:initialize
    int buyDay = -1; // @step:initialize

    for (int dayIndex = 1; dayIndex < (int)prices.size(); dayIndex++) {
        int previousPrice = prices[dayIndex - 1]; // @step:compare
        int currentPrice = prices[dayIndex]; // @step:compare

        if (currentPrice > previousPrice) {
            // @step:compare — rising day: open a buy if not already in a trade
            if (buyDay == -1) { // @step:compare
                buyDay = dayIndex - 1; // @step:visit
            }
        } else {
            // Falling or flat: close any open trade
            if (buyDay != -1) { // @step:compare
                int profit = previousPrice - prices[buyDay]; // @step:visit
                totalProfit += profit; // @step:visit
                transactions.push_back({buyDay, dayIndex - 1}); // @step:visit
                buyDay = -1; // @step:visit
            }
        }
    }

    // Close any remaining open trade at the last day
    if (buyDay != -1) { // @step:compare
        int lastDay = (int)prices.size() - 1;
        int profit = prices[lastDay] - prices[buyDay]; // @step:visit
        totalProfit += profit; // @step:visit
        transactions.push_back({buyDay, lastDay}); // @step:visit
    }

    return {totalProfit, transactions}; // @step:complete
}
