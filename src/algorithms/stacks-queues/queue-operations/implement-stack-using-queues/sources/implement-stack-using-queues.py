# Implement Stack Using Queues — use one queue to emulate LIFO stack behaviour (LeetCode 225)
from collections import deque

def implement_stack_using_queues(values):
    queue = deque()  # @step:initialize
    pop_results = []  # @step:initialize

    # Push phase — enqueue each value, then rotate all prior elements behind it
    for element_idx in range(len(values)):
        current_value = values[element_idx]  # @step:visit
        queue.append(current_value)  # @step:enqueue
        # Rotate: move every element that was there before the new one to the back
        for rotation_idx in range(len(queue) - 1):
            transferred = queue.popleft()  # @step:transfer
            queue.append(transferred)  # @step:transfer

    # Pop phase — front of queue is always the most-recently pushed element (LIFO)
    while queue:
        popped_value = queue.popleft()  # @step:dequeue
        pop_results.append(popped_value)  # @step:dequeue

    return pop_results  # @step:complete
