# Tribonacci tabulation — build DP table iteratively from three base cases
def tribonacci_tabulation(target_index: int) -> int:  # @step:initialize
    if target_index == 0:  # @step:initialize
        return 0  # @step:initialize
    if target_index <= 2:  # @step:initialize
        return 1  # @step:initialize
    dp_table = [0] * (target_index + 1)  # @step:initialize,fill-table
    dp_table[1] = 1  # @step:fill-table
    dp_table[2] = 1  # @step:fill-table
    # Each entry is the sum of the three preceding entries
    for current_index in range(3, target_index + 1):  # @step:compute-cell
        dp_table[current_index] = (
            dp_table[current_index - 1]
            + dp_table[current_index - 2]
            + dp_table[current_index - 3]
        )  # @step:compute-cell,read-cache
    return dp_table[target_index]  # @step:complete
