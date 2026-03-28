# Min Size Subarray Sum — O(n) variable sliding window to find shortest subarray with sum >= target
def min_size_subarray_sum(input_array: list[int], target: int) -> dict:
    if len(input_array) == 0 or target <= 0:  # @step:initialize
        return {"min_length": 0, "start_index": 0}  # @step:initialize

    left_pointer = 0  # @step:initialize
    current_sum = 0
    min_length = float("inf")
    best_start_index = 0

    # Expand the right boundary of the window
    for right_pointer in range(len(input_array)):
        current_sum += input_array[right_pointer]  # @step:expand-window

        # Shrink from the left while the sum constraint is satisfied
        while current_sum >= target:  # @step:compare
            window_length = right_pointer - left_pointer + 1  # @step:compare
            if window_length < min_length:  # @step:compare
                min_length = window_length  # @step:compare
                best_start_index = left_pointer  # @step:compare
            current_sum -= input_array[left_pointer]  # @step:shrink-window
            left_pointer += 1  # @step:shrink-window

    if min_length == float("inf"):
        return {"min_length": 0, "start_index": 0}  # @step:complete
    return {"min_length": min_length, "start_index": best_start_index}  # @step:complete
