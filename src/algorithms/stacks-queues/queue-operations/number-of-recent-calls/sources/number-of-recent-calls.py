# Number of Recent Calls — count calls in a 3000ms sliding window using a queue (LeetCode 933)
from collections import deque

def number_of_recent_calls(timestamps):
    queue = deque()  # @step:initialize
    results = []  # @step:initialize

    for current_timestamp in timestamps:  # @step:visit
        queue.append(current_timestamp)  # @step:enqueue

        # Remove timestamps outside the 3000ms window
        while queue[0] < current_timestamp - 3000:  # @step:dequeue
            queue.popleft()  # @step:dequeue

        results.append(len(queue))  # @step:complete

    return results  # @step:complete
