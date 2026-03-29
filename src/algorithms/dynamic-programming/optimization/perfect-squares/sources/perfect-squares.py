# Perfect Squares tabulation — find minimum number of perfect squares summing to n
def perfect_squares(target_number: int) -> int:  # @step:initialize
    dp_table = [float("inf")] * (target_number + 1)  # @step:initialize,fill-table
    dp_table[0] = 0  # @step:fill-table
    # Fill each cell with the minimum number of perfect squares needed
    for cell_index in range(1, target_number + 1):  # @step:compute-cell
        square_root = 1  # @step:compute-cell
        while square_root * square_root <= cell_index:  # @step:read-cache
            prev_index = cell_index - square_root * square_root  # @step:read-cache
            if dp_table[prev_index] + 1 < dp_table[cell_index]:  # @step:compute-cell
                dp_table[cell_index] = dp_table[prev_index] + 1  # @step:compute-cell
            square_root += 1
    return dp_table[target_number]  # @step:complete
