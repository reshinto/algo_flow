// Best Time to Buy and Sell Stock — O(n) single-pass maximum profit via min-price tracking
package besttimebuysell

func bestTimeBuySell(prices []int) (maxProfit int, buyDay int, sellDay int) {
	if len(prices) == 0 {
		// @step:initialize
		return 0, -1, -1 // @step:initialize
	}

	minPrice := prices[0] // @step:initialize
	maxProfit = 0         // @step:initialize
	buyDay = 0
	sellDay = 0
	currentBuyDay := 0

	for dayIndex := 1; dayIndex < len(prices); dayIndex++ {
		currentPrice := prices[dayIndex] // @step:compare

		if currentPrice < minPrice { // @step:compare
			minPrice = currentPrice        // @step:visit
			currentBuyDay = dayIndex       // @step:visit
		}

		potentialProfit := currentPrice - minPrice // @step:compare

		if potentialProfit > maxProfit { // @step:compare
			maxProfit = potentialProfit // @step:visit
			buyDay = currentBuyDay     // @step:visit
			sellDay = dayIndex         // @step:visit
		}
	}

	return maxProfit, buyDay, sellDay // @step:complete
}
