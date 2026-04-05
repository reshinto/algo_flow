# Interleave First Half Queue — interleave the first half of a queue with the second half using a stack
from collections import deque

def interleave_first_half_queue(values):
    queue = deque(values)  # @step:initialize
    half_size = len(values) // 2  # @step:initialize
    stack = []  # @step:initialize

    # Step 1: Dequeue first half into stack
    for _ in range(half_size):
        stack.append(queue.popleft())  # @step:push

    # Step 2: Enqueue stack elements back to queue (reverses first half)
    while stack:
        queue.append(stack.pop())  # @step:enqueue

    # Step 3: Dequeue second half and enqueue back (move original second half to rear)
    for _ in range(half_size):
        queue.append(queue.popleft())  # @step:transfer

    # Step 4: Dequeue first half (now at front) into stack
    for _ in range(half_size):
        stack.append(queue.popleft())  # @step:push

    # Step 5: Interleave — alternately pop from stack and dequeue from queue
    result = []  # @step:initialize
    while stack:
        result.append(stack.pop())  # @step:pop
        result.append(queue.popleft())  # @step:dequeue
    if queue:
        result.append(queue.popleft())  # @step:dequeue

    return result  # @step:complete
