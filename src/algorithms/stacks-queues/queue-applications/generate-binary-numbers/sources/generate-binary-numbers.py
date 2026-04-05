# Generate Binary Numbers — use a BFS-style queue to produce binary representations of 1 through N
from collections import deque

def generate_binary_numbers(count):
    queue = deque(["1"])  # @step:initialize
    result = []  # @step:initialize
    for _ in range(count):
        current = queue.popleft()  # @step:dequeue
        result.append(current)  # @step:dequeue
        queue.append(current + "0")  # @step:enqueue
        queue.append(current + "1")  # @step:enqueue
    return result  # @step:complete
