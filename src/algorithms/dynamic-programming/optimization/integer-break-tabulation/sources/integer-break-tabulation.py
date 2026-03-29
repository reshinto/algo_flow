# Integer Break tabulation — build DP table iteratively from base cases
def integer_break_tabulation(target_number: int) -> int:  # @step:initialize
    dp_table = [0] * (target_number + 1)  # @step:initialize
    dp_table[1] = 1  # @step:fill-table
    # For each i, try every split j + (i - j) and track the best product
    for split_index in range(2, target_number + 1):  # @step:compute-cell
        for part_index in range(1, split_index):  # @step:compute-cell,read-cache
            keep_split = part_index * (split_index - part_index)  # @step:compute-cell
            use_dp = part_index * dp_table[split_index - part_index]  # @step:read-cache,compute-cell
            dp_table[split_index] = max(dp_table[split_index], keep_split, use_dp)  # @step:compute-cell
    return dp_table[target_number]  # @step:complete
