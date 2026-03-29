# Minimum Jumps tabulation — build DP table iteratively from base case
def minimum_jumps(jumps: list[int]) -> int:  # @step:initialize
    array_length = len(jumps)  # @step:initialize
    if array_length == 0:  # @step:initialize
        return 0  # @step:initialize
    dp_table = [float("inf")] * array_length  # @step:initialize,fill-table
    dp_table[0] = 0  # @step:fill-table
    # For each position, check all prior positions that can reach it
    for target_index in range(1, array_length):  # @step:compute-cell
        for source_index in range(target_index):  # @step:read-cache
            if dp_table[source_index] != float("inf") and source_index + jumps[source_index] >= target_index:  # @step:read-cache
                dp_table[target_index] = min(dp_table[target_index], dp_table[source_index] + 1)  # @step:compute-cell,read-cache
    return -1 if dp_table[array_length - 1] == float("inf") else dp_table[array_length - 1]  # @step:complete
