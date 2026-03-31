# PQ Enqueue — insert an element into a min-heap-based priority queue and restore heap order via sift-up
def pq_enqueue(priority_queue, value):
    queue = priority_queue[:]  # @step:initialize
    queue.append(value)  # @step:heap-insert
    current_idx = len(queue) - 1  # @step:heap-insert
    # Sift up: bubble the new element toward the root until heap property holds
    while current_idx > 0:  # @step:sift-up
        parent_idx = (current_idx - 1) // 2  # @step:sift-up
        if queue[current_idx] >= queue[parent_idx]:  # @step:compare
            break
        # New element has higher priority (smaller value) — swap with parent
        queue[current_idx], queue[parent_idx] = queue[parent_idx], queue[current_idx]  # @step:heap-swap
        current_idx = parent_idx  # @step:sift-up
    return queue  # @step:complete
