# Longest K-Distinct — O(n) variable sliding window with at-most K distinct elements
def longest_k_distinct(input_array: list[int], max_distinct: int) -> dict:
    array_length = len(input_array)

    if array_length == 0 or max_distinct <= 0:  # @step:initialize
        return {"max_length": 0, "start_index": 0}  # @step:initialize

    frequency_map: dict[int, int] = {}  # @step:initialize
    window_start = 0
    max_length = 0
    best_start = 0

    for window_end in range(array_length):
        incoming_element = input_array[window_end]  # @step:expand-window
        frequency_map[incoming_element] = frequency_map.get(incoming_element, 0) + 1  # @step:expand-window

        # Shrink from the left while distinct count exceeds max_distinct
        while len(frequency_map) > max_distinct:
            outgoing_element = input_array[window_start]  # @step:shrink-window
            frequency_map[outgoing_element] -= 1  # @step:shrink-window
            if frequency_map[outgoing_element] == 0:  # @step:shrink-window
                del frequency_map[outgoing_element]  # @step:shrink-window
            window_start += 1  # @step:shrink-window

        current_length = window_end - window_start + 1  # @step:compare
        if current_length > max_length:  # @step:compare
            max_length = current_length  # @step:compare
            best_start = window_start  # @step:compare

    return {"max_length": max_length, "start_index": best_start}  # @step:complete
