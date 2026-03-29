# Can Jump tabulation — determine if you can reach the last index from index 0
def can_jump(nums: list[int]) -> bool:  # @step:initialize
    table_size = len(nums)  # @step:initialize
    dp_table = [0] * table_size  # @step:initialize,fill-table
    dp_table[0] = 1  # @step:fill-table
    # For each index, check if any prior reachable index can reach it
    for target_index in range(1, table_size):  # @step:compute-cell
        for source_index in range(target_index):  # @step:read-cache
            if dp_table[source_index] == 1 and source_index + nums[source_index] >= target_index:  # @step:read-cache,compute-cell
                dp_table[target_index] = 1  # @step:compute-cell
                break
    return dp_table[table_size - 1] == 1  # @step:complete
