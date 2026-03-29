# LIS tabulation — O(n^2) bottom-up DP for longest increasing subsequence length
def lis_length(sequence: list[int]) -> int:  # @step:initialize
    sequence_length = len(sequence)  # @step:initialize
    if sequence_length == 0:  # @step:initialize
        return 0  # @step:initialize
    dp_table = [1] * sequence_length  # @step:initialize,fill-table
    # Each element is a subsequence of length 1
    max_length = 1  # @step:fill-table
    # For each index, scan all previous indices
    for outer_index in range(1, sequence_length):  # @step:compute-cell
        for inner_index in range(outer_index):  # @step:read-cache
            if sequence[inner_index] < sequence[outer_index]:  # @step:read-cache
                dp_table[outer_index] = max(dp_table[outer_index], dp_table[inner_index] + 1)  # @step:compute-cell,read-cache
        if dp_table[outer_index] > max_length:  # @step:compute-cell
            max_length = dp_table[outer_index]  # @step:compute-cell
    return max_length  # @step:complete
