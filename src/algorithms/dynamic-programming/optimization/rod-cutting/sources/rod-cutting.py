# Rod Cutting (Tabulation) — find maximum revenue from cutting a rod of length n
def rod_cutting(prices: list[int]) -> int:  # @step:initialize
    rod_length = len(prices)  # @step:initialize
    dp_table = [0] * (rod_length + 1)  # @step:initialize,fill-table
    # dp_table[0] = 0 (base case: zero revenue for zero-length rod)
    for current_length in range(1, rod_length + 1):  # @step:compute-cell
        for cut_length in range(1, current_length + 1):
            remainder = current_length - cut_length  # @step:read-cache
            candidate = prices[cut_length - 1] + dp_table[remainder]  # @step:read-cache
            if candidate > dp_table[current_length]:
                dp_table[current_length] = candidate  # @step:compute-cell
    return dp_table[rod_length]  # @step:complete
