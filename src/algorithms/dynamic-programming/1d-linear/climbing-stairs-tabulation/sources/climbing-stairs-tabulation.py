# Climbing stairs tabulation — count ways to reach the top
def climbing_stairs_tabulation(number_of_stairs: int) -> int:  # @step:initialize
    if number_of_stairs <= 1:  # @step:initialize
        return 1  # @step:initialize
    dp_table = [0] * (number_of_stairs + 1)  # @step:initialize,fill-table
    dp_table[0] = 1  # @step:fill-table
    dp_table[1] = 1  # @step:fill-table
    # Each entry is the sum of the ways to arrive from one step below and two steps below
    for current_step in range(2, number_of_stairs + 1):  # @step:compute-cell
        dp_table[current_step] = dp_table[current_step - 1] + dp_table[current_step - 2]  # @step:compute-cell,read-cache
    return dp_table[number_of_stairs]  # @step:complete
