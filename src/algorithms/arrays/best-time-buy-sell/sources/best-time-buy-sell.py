# Best Time to Buy and Sell Stock — O(n) single-pass maximum profit via min-price tracking
def best_time_buy_sell(prices: list[int]) -> dict:
    if len(prices) == 0:  # @step:initialize
        return {"max_profit": 0, "buy_day": -1, "sell_day": -1}  # @step:initialize

    min_price = prices[0]  # @step:initialize
    max_profit = 0  # @step:initialize
    buy_day = 0
    sell_day = 0
    current_buy_day = 0

    for day_index in range(1, len(prices)):
        current_price = prices[day_index]  # @step:compare

        if current_price < min_price:  # @step:compare
            min_price = current_price  # @step:visit
            current_buy_day = day_index  # @step:visit

        potential_profit = current_price - min_price  # @step:compare

        if potential_profit > max_profit:  # @step:compare
            max_profit = potential_profit  # @step:visit
            buy_day = current_buy_day  # @step:visit
            sell_day = day_index  # @step:visit

    return {"max_profit": max_profit, "buy_day": buy_day, "sell_day": sell_day}  # @step:complete
