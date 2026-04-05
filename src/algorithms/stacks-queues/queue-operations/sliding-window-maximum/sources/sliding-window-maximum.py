# Sliding Window Maximum — find the max in each window of size k using a monotonic deque of indices
from collections import deque

def sliding_window_max_monotonic(nums, window_size):
    mono_deque = deque()  # @step:initialize
    result = []  # @step:initialize
    for element_idx in range(len(nums)):  # @step:visit
        # Remove indices that have fallen outside the current window
        while mono_deque and mono_deque[0] <= element_idx - window_size:  # @step:dequeue
            mono_deque.popleft()  # @step:dequeue
        # Maintain monotonic decreasing order — remove smaller elements from the rear
        while mono_deque and nums[mono_deque[-1]] <= nums[element_idx]:  # @step:maintain-monotonic
            mono_deque.pop()  # @step:maintain-monotonic
        mono_deque.append(element_idx)  # @step:enqueue
        # Once the first full window is reached, record the maximum (front of deque)
        if element_idx >= window_size - 1:  # @step:peek
            result.append(nums[mono_deque[0]])  # @step:peek
    return result  # @step:complete
