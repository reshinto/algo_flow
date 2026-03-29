# Catalan numbers tabulation — build DP table iteratively from the base case
def catalan_number(target_index: int) -> int:  # @step:initialize
    if target_index == 0:  # @step:initialize
        return 1  # @step:initialize
    dp_table = [0] * (target_index + 1)  # @step:initialize,fill-table
    dp_table[0] = 1  # @step:fill-table
    # Each entry is the sum C(i) = sum over k from 0 to i-1 of C(k) * C(i-1-k)
    for outer_index in range(1, target_index + 1):  # @step:compute-cell
        running_sum = 0  # @step:compute-cell
        for split_index in range(outer_index):  # @step:read-cache
            running_sum += dp_table[split_index] * dp_table[outer_index - 1 - split_index]  # @step:read-cache,compute-cell
        dp_table[outer_index] = running_sum  # @step:compute-cell
    return dp_table[target_index]  # @step:complete
