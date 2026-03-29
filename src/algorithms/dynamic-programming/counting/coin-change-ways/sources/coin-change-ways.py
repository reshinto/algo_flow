# Coin Change Ways (Tabulation) — count distinct ways to make each amount using given coins
def coin_change_ways(amount: int, coins: list[int]) -> int:  # @step:initialize
    dp_table = [0] * (amount + 1)  # @step:initialize,fill-table
    dp_table[0] = 1  # @step:fill-table
    # Outer loop over coins — ordering ensures we count combinations, not permutations
    for coin in coins:  # @step:compute-cell
        for current_amount in range(coin, amount + 1):  # @step:compute-cell
            dp_table[current_amount] = dp_table[current_amount] + dp_table[current_amount - coin]  # @step:compute-cell,read-cache
    return dp_table[amount]  # @step:complete
