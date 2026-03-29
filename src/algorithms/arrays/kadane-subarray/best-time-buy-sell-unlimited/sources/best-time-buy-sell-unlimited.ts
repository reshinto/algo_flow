// Best Time Buy/Sell (Unlimited) — O(n) greedy: capture every upward price slope
function bestTimeBuySellUnlimited(prices: number[]): {
  totalProfit: number;
  transactions: number[][];
} {
  if (prices.length <= 1) {
    // @step:initialize
    return { totalProfit: 0, transactions: [] }; // @step:initialize
  }

  let totalProfit = 0; // @step:initialize
  const transactions: number[][] = []; // @step:initialize
  let buyDay = -1; // @step:initialize

  for (let dayIndex = 1; dayIndex < prices.length; dayIndex++) {
    const previousPrice = prices[dayIndex - 1]!; // @step:compare
    const currentPrice = prices[dayIndex]!; // @step:compare

    if (currentPrice > previousPrice) {
      // @step:compare — rising day: open a buy if not already in a trade
      if (buyDay === -1) {
        // @step:compare
        buyDay = dayIndex - 1; // @step:visit
      }
    } else {
      // Falling or flat: close any open trade
      if (buyDay !== -1) {
        // @step:compare
        const profit = previousPrice - prices[buyDay]!; // @step:visit
        totalProfit += profit; // @step:visit
        transactions.push([buyDay, dayIndex - 1]); // @step:visit
        buyDay = -1; // @step:visit
      }
    }
  }

  // Close any remaining open trade at the last day
  if (buyDay !== -1) {
    // @step:compare
    const profit = prices[prices.length - 1]! - prices[buyDay]!; // @step:visit
    totalProfit += profit; // @step:visit
    transactions.push([buyDay, prices.length - 1]); // @step:visit
  }

  return { totalProfit, transactions }; // @step:complete
}
