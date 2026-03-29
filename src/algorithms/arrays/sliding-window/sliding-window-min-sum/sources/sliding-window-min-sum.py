# Sliding Window Min Sum — O(n) minimum-sum subarray of fixed size
def min_sum_subarray(input_array: list[int], window_size: int) -> dict:
    if len(input_array) == 0 or window_size <= 0 or window_size > len(input_array):  # @step:initialize
        return {"min_sum": 0, "window_start_index": 0}  # @step:initialize

    # Compute the sum of the first window as the baseline
    current_sum = 0  # @step:move-window
    for init_index in range(window_size):  # @step:move-window
        current_sum += input_array[init_index]  # @step:move-window

    min_sum = current_sum
    window_start_index = 0

    # Slide the window: subtract left element, add right element
    for right_index in range(window_size, len(input_array)):
        current_sum -= input_array[right_index - window_size]  # @step:shrink-window
        current_sum += input_array[right_index]  # @step:expand-window

        if current_sum < min_sum:  # @step:compare
            min_sum = current_sum  # @step:compare
            window_start_index = right_index - window_size + 1  # @step:compare

    return {"min_sum": min_sum, "window_start_index": window_start_index}  # @step:complete
