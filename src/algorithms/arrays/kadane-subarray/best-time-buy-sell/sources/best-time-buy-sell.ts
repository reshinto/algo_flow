// Best Time to Buy and Sell Stock — O(n) single-pass maximum profit via min-price tracking
function bestTimeBuySell(prices: number[]): {
  maxProfit: number;
  buyDay: number;
  sellDay: number;
} {
  if (prices.length === 0) {
    // @step:initialize
    return { maxProfit: 0, buyDay: -1, sellDay: -1 }; // @step:initialize
  }

  let minPrice = prices[0]!; // @step:initialize
  let maxProfit = 0; // @step:initialize
  let buyDay = 0;
  let sellDay = 0;
  let currentBuyDay = 0;

  for (let dayIndex = 1; dayIndex < prices.length; dayIndex++) {
    const currentPrice = prices[dayIndex]!; // @step:compare

    if (currentPrice < minPrice) {
      // @step:compare
      minPrice = currentPrice; // @step:visit
      currentBuyDay = dayIndex; // @step:visit
    }

    const potentialProfit = currentPrice - minPrice; // @step:compare

    if (potentialProfit > maxProfit) {
      // @step:compare
      maxProfit = potentialProfit; // @step:visit
      buyDay = currentBuyDay; // @step:visit
      sellDay = dayIndex; // @step:visit
    }
  }

  return { maxProfit, buyDay, sellDay }; // @step:complete
}
