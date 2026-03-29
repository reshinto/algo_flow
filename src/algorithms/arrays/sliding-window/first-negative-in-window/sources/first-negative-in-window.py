# First Negative in Window — O(n) using a deque to track negative indices
from collections import deque

def first_negative_in_window(input_array: list[int], window_size: int) -> list[int]:
    array_length = len(input_array)

    if array_length == 0 or window_size <= 0 or window_size > array_length:  # @step:initialize
        return []  # @step:initialize

    # Deque stores indices of negative numbers in current window
    negative_indices: deque[int] = deque()  # @step:initialize
    result: list[int] = []

    # Process first window
    for init_index in range(window_size):  # @step:move-window
        if input_array[init_index] < 0:  # @step:move-window
            negative_indices.append(init_index)  # @step:move-window

    # Record result for first window
    result.append(input_array[negative_indices[0]] if negative_indices else 0)  # @step:compare

    # Slide window across remaining positions
    for right_index in range(window_size, array_length):
        left_index = right_index - window_size

        # Remove indices that are out of current window
        if negative_indices and negative_indices[0] <= left_index:  # @step:shrink-window
            negative_indices.popleft()  # @step:shrink-window

        # Add new element if negative
        if input_array[right_index] < 0:  # @step:expand-window
            negative_indices.append(right_index)  # @step:expand-window

        # Record first negative in current window (or 0 if none)
        result.append(input_array[negative_indices[0]] if negative_indices else 0)  # @step:compare

    return result  # @step:complete
