// Best Time Buy/Sell (Unlimited) — O(n) greedy: capture every upward price slope
package besttimebuysellunlimited

func bestTimeBuySellUnlimited(prices []int) (totalProfit int, transactions [][2]int) {
	if len(prices) <= 1 {
		// @step:initialize
		return 0, nil // @step:initialize
	}

	totalProfit = 0             // @step:initialize
	transactions = [][2]int{}   // @step:initialize
	buyDay := -1                // @step:initialize

	for dayIndex := 1; dayIndex < len(prices); dayIndex++ {
		previousPrice := prices[dayIndex-1] // @step:compare
		currentPrice := prices[dayIndex]    // @step:compare

		if currentPrice > previousPrice {
			// @step:compare — rising day: open a buy if not already in a trade
			if buyDay == -1 { // @step:compare
				buyDay = dayIndex - 1 // @step:visit
			}
		} else {
			// Falling or flat: close any open trade
			if buyDay != -1 { // @step:compare
				profit := previousPrice - prices[buyDay] // @step:visit
				totalProfit += profit                     // @step:visit
				transactions = append(transactions, [2]int{buyDay, dayIndex - 1}) // @step:visit
				buyDay = -1                               // @step:visit
			}
		}
	}

	// Close any remaining open trade at the last day
	if buyDay != -1 { // @step:compare
		lastDay := len(prices) - 1
		profit := prices[lastDay] - prices[buyDay] // @step:visit
		totalProfit += profit                       // @step:visit
		transactions = append(transactions, [2]int{buyDay, lastDay}) // @step:visit
	}

	return totalProfit, transactions // @step:complete
}
