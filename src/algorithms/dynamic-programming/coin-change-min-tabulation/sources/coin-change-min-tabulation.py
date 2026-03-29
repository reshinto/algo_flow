# Coin Change (Min Coins) tabulation — find minimum coins needed to make amount
def coin_change_min_tabulation(amount: int, coins: list[int]) -> int:  # @step:initialize
    table_size = amount + 1  # @step:initialize
    dp_table = [float("inf")] * table_size  # @step:initialize,fill-table
    dp_table[0] = 0  # @step:fill-table
    # For each amount, try every coin and take the minimum
    for current_amount in range(1, amount + 1):  # @step:compute-cell
        for coin in coins:
            if current_amount >= coin:  # @step:read-cache
                candidate = dp_table[current_amount - coin] + 1  # @step:read-cache
                if candidate < dp_table[current_amount]:
                    dp_table[current_amount] = candidate  # @step:compute-cell
    return -1 if dp_table[amount] == float("inf") else dp_table[amount]  # @step:complete
