# Maximum Subarray Kadane — build DP table where dp[i] = max subarray sum ending at index i
def max_subarray_kadane(array: list[int]) -> int:  # @step:initialize
    if len(array) == 0:  # @step:initialize
        return 0  # @step:initialize
    dp_table = [0] * len(array)  # @step:initialize,fill-table
    dp_table[0] = array[0]  # @step:fill-table
    max_sum = dp_table[0]  # @step:fill-table
    # Each entry: extend the previous subarray or start fresh at current element
    for element_index in range(1, len(array)):  # @step:compute-cell
        dp_table[element_index] = max(
            array[element_index],
            dp_table[element_index - 1] + array[element_index],
        )  # @step:compute-cell,read-cache
        if dp_table[element_index] > max_sum:  # @step:compute-cell
            max_sum = dp_table[element_index]  # @step:compute-cell
    return max_sum  # @step:complete
