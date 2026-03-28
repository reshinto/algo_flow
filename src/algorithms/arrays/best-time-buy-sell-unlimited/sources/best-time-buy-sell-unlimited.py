# Best Time Buy/Sell (Unlimited) — O(n) greedy: capture every upward price slope
def best_time_buy_sell_unlimited(prices: list[int]) -> dict:
    if len(prices) <= 1:  # @step:initialize
        return {"total_profit": 0, "transactions": []}  # @step:initialize

    total_profit = 0  # @step:initialize
    transactions = []  # @step:initialize
    buy_day = -1  # @step:initialize

    for day_index in range(1, len(prices)):
        previous_price = prices[day_index - 1]  # @step:compare
        current_price = prices[day_index]  # @step:compare

        if current_price > previous_price:  # @step:compare — rising day: open a buy if not in a trade
            if buy_day == -1:  # @step:compare
                buy_day = day_index - 1  # @step:visit
        else:
            if buy_day != -1:  # @step:compare — falling/flat: close any open trade
                profit = previous_price - prices[buy_day]  # @step:visit
                total_profit += profit  # @step:visit
                transactions.append([buy_day, day_index - 1])  # @step:visit
                buy_day = -1  # @step:visit

    # Close any remaining open trade at the last day
    if buy_day != -1:  # @step:compare
        profit = prices[-1] - prices[buy_day]  # @step:visit
        total_profit += profit  # @step:visit
        transactions.append([buy_day, len(prices) - 1])  # @step:visit

    return {"total_profit": total_profit, "transactions": transactions}  # @step:complete
