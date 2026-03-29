# Kadane's Algorithm — O(n) maximum subarray sum via extend-or-restart decision
def kadanes_algorithm(input_array: list[int]) -> dict:
    if len(input_array) == 0:  # @step:initialize
        return {"max_sum": 0, "start_index": -1, "end_index": -1}  # @step:initialize

    current_sum = input_array[0]  # @step:initialize
    global_max = input_array[0]  # @step:initialize
    current_start = 0
    best_start = 0
    best_end = 0

    for scan_index in range(1, len(input_array)):
        extend_sum = current_sum + input_array[scan_index]  # @step:compare
        restart_sum = input_array[scan_index]  # @step:compare

        if restart_sum > extend_sum:  # @step:compare
            current_sum = restart_sum  # @step:shrink-window
            current_start = scan_index  # @step:shrink-window
        else:
            current_sum = extend_sum  # @step:expand-window

        if current_sum > global_max:  # @step:visit
            global_max = current_sum  # @step:visit
            best_start = current_start  # @step:visit
            best_end = scan_index  # @step:visit

    return {"max_sum": global_max, "start_index": best_start, "end_index": best_end}  # @step:complete
