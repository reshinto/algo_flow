# Moving Average from Data Stream — fixed-size sliding window queue (LeetCode 346)
from typing import List
from collections import deque


def moving_average_from_stream(values: List[int], window_size: int) -> List[float]:
    queue: deque = deque()  # @step:initialize
    running_sum: float = 0  # @step:initialize
    averages: List[float] = []  # @step:initialize

    for current_value in values:  # @step:visit
        queue.append(current_value)  # @step:enqueue
        running_sum += current_value  # @step:enqueue

        if len(queue) > window_size:  # @step:dequeue
            running_sum -= queue.popleft()  # @step:dequeue

        averages.append(running_sum / len(queue))  # @step:complete

    return averages  # @step:complete
