# Partition Equal Subset Sum (Tabulation) — determine if array can be split into two equal-sum subsets
def partition_equal_subset(numbers: list[int]) -> bool:  # @step:initialize
    total_sum = sum(numbers)  # @step:initialize
    if total_sum % 2 != 0:  # @step:initialize
        return False
    target = total_sum // 2  # @step:initialize
    table_size = target + 1  # @step:initialize
    dp_table = [0] * table_size  # @step:initialize,fill-table
    dp_table[0] = 1  # @step:fill-table
    # For each number, iterate right-to-left to prevent using it more than once
    for current_number in numbers:  # @step:compute-cell
        for sum_index in range(target, current_number - 1, -1):
            if dp_table[sum_index - current_number] == 1:  # @step:read-cache
                dp_table[sum_index] = 1  # @step:compute-cell
    return dp_table[target] == 1  # @step:complete
