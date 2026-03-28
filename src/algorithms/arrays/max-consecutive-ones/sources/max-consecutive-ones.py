# Max Consecutive Ones III — O(n) variable sliding window with at most k zero-flips
def max_consecutive_ones(input_array: list[int], max_flips: int) -> dict:
    if len(input_array) == 0:  # @step:initialize
        return {"max_length": 0, "start_index": 0}  # @step:initialize

    left_pointer = 0  # @step:initialize
    zero_count = 0
    max_length = 0
    best_start_index = 0

    # Expand the right boundary of the window
    for right_pointer in range(len(input_array)):
        if input_array[right_pointer] == 0:
            zero_count += 1  # @step:expand-window

        # Shrink from left when zero count exceeds the allowed flips
        while zero_count > max_flips:  # @step:compare
            if input_array[left_pointer] == 0:
                zero_count -= 1  # @step:shrink-window
            left_pointer += 1  # @step:shrink-window

        window_length = right_pointer - left_pointer + 1  # @step:compare
        if window_length > max_length:  # @step:compare
            max_length = window_length  # @step:compare
            best_start_index = left_pointer  # @step:compare

    return {"max_length": max_length, "start_index": best_start_index}  # @step:complete
