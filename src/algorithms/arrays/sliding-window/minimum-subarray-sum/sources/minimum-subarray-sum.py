# Minimum Subarray Sum — O(n) inverted Kadane's algorithm tracking minimum instead of maximum
def minimum_subarray_sum(input_array: list[int]) -> dict:
    if len(input_array) == 0:  # @step:initialize
        return {"min_sum": 0, "start_index": 0, "end_index": 0}  # @step:initialize

    min_ending_here = input_array[0]  # @step:initialize
    min_so_far = input_array[0]  # @step:initialize
    current_start_index = 0
    best_start_index = 0
    best_end_index = 0

    # Extend the current subarray or restart from the current element
    for element_index in range(1, len(input_array)):
        if input_array[element_index] < min_ending_here + input_array[element_index]:  # @step:compare
            min_ending_here = input_array[element_index]  # @step:compare
            current_start_index = element_index  # @step:compare
        else:
            min_ending_here += input_array[element_index]  # @step:compare

        if min_ending_here < min_so_far:  # @step:compare
            min_so_far = min_ending_here  # @step:compare
            best_start_index = current_start_index  # @step:compare
            best_end_index = element_index  # @step:compare

    return {"min_sum": min_so_far, "start_index": best_start_index, "end_index": best_end_index}  # @step:complete
