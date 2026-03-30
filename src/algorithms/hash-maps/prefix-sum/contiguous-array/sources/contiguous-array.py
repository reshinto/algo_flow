# Contiguous Array — find the longest subarray with equal number of 0s and 1s
def contiguous_array(numbers):
    prefix_sum_map = {0: -1}  # @step:initialize
    running_sum = 0
    max_length = 0
    for element_index in range(len(numbers)):
        running_sum += -1 if numbers[element_index] == 0 else 1  # @step:check-prefix
        if running_sum in prefix_sum_map:
            subarray_length = element_index - prefix_sum_map[running_sum]  # @step:prefix-found
            max_length = max(max_length, subarray_length)
        else:
            prefix_sum_map[running_sum] = element_index  # @step:insert-key
    return max_length  # @step:complete
