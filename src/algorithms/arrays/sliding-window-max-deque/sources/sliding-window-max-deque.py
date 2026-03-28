# Sliding Window Maximum (Deque) — O(n) monotonic decreasing deque
from collections import deque as Deque

def sliding_window_max_deque(input_array: list[int], window_size: int) -> list[int]:
    array_length = len(input_array)
    if array_length == 0 or window_size <= 0 or window_size > array_length:  # @step:initialize
        return []  # @step:initialize

    result = []  # @step:initialize
    index_deque = Deque()  # @step:initialize — stores indices, front = max of current window

    for current_index in range(array_length):
        # Remove indices outside the current window from the front
        while index_deque and index_deque[0] < current_index - window_size + 1:  # @step:compare
            index_deque.popleft()  # @step:visit

        # Remove indices of elements smaller than the current element from the back
        while index_deque and input_array[index_deque[-1]] < input_array[current_index]:  # @step:compare
            index_deque.pop()  # @step:visit

        index_deque.append(current_index)  # @step:visit

        # The window is fully formed once current_index >= window_size - 1
        if current_index >= window_size - 1:  # @step:compare
            result.append(input_array[index_deque[0]])  # @step:visit

    return result  # @step:complete
