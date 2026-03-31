# PQ Dequeue — remove and return the highest-priority (smallest) element from a min-heap priority queue
def pq_dequeue(priority_queue):
    queue = priority_queue[:]  # @step:initialize
    dequeued_value = queue[0]  # @step:heap-extract
    last_idx = len(queue) - 1  # @step:heap-extract
    # Move last element to root and remove the last position
    queue[0], queue[last_idx] = queue[last_idx], queue[0]  # @step:heap-swap
    queue.pop()  # @step:heap-extract
    # Sift down the new root to restore heap property
    size = len(queue)
    parent_idx = 0  # @step:sift-down
    while True:  # @step:sift-down
        smallest_idx = parent_idx  # @step:sift-down
        left_idx = 2 * parent_idx + 1  # @step:sift-down
        right_idx = 2 * parent_idx + 2  # @step:sift-down
        # Find the smallest among parent, left child, and right child
        if left_idx < size and queue[left_idx] < queue[smallest_idx]:  # @step:compare
            smallest_idx = left_idx
        if right_idx < size and queue[right_idx] < queue[smallest_idx]:  # @step:compare
            smallest_idx = right_idx
        if smallest_idx == parent_idx:  # @step:sift-down
            break
        # Swap parent with highest-priority child
        queue[parent_idx], queue[smallest_idx] = queue[smallest_idx], queue[parent_idx]  # @step:heap-swap
        parent_idx = smallest_idx  # @step:sift-down
    return {'dequeued_value': dequeued_value, 'remaining_queue': queue}  # @step:complete
