# Fibonacci tabulation — build DP table iteratively from base cases
def fibonacci_tabulation(target_index: int) -> int:  # @step:initialize
    if target_index <= 1:  # @step:initialize
        return target_index  # @step:initialize
    dp_table = [0] * (target_index + 1)  # @step:initialize,fill-table
    dp_table[1] = 1  # @step:fill-table
    # Each entry is the sum of the two preceding entries
    for current_index in range(2, target_index + 1):  # @step:compute-cell
        dp_table[current_index] = dp_table[current_index - 1] + dp_table[current_index - 2]  # @step:compute-cell,read-cache
    return dp_table[target_index]  # @step:complete
