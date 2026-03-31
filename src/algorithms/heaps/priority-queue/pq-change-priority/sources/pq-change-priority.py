# PQ Change Priority — update element priority at a given index, then restore heap order via sift-up or sift-down
def pq_change_priority(priority_queue, target_index, new_value):
    queue = priority_queue[:]  # @step:initialize
    old_value = queue[target_index]  # @step:heap-update
    queue[target_index] = new_value  # @step:heap-update

    if new_value < old_value:
        # Priority increased (value decreased) — sift up
        current_idx = target_index  # @step:sift-up
        while current_idx > 0:  # @step:sift-up
            parent_idx = (current_idx - 1) // 2  # @step:sift-up
            if queue[current_idx] >= queue[parent_idx]:  # @step:compare
                break
            queue[current_idx], queue[parent_idx] = queue[parent_idx], queue[current_idx]  # @step:heap-swap
            current_idx = parent_idx  # @step:sift-up
    else:
        # Priority decreased (value increased) — sift down
        parent_idx = target_index  # @step:sift-down
        size = len(queue)
        while True:  # @step:sift-down
            smallest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < size and queue[left_idx] < queue[smallest_idx]:  # @step:compare
                smallest_idx = left_idx
            if right_idx < size and queue[right_idx] < queue[smallest_idx]:  # @step:compare
                smallest_idx = right_idx
            if smallest_idx == parent_idx:  # @step:sift-down
                break
            queue[parent_idx], queue[smallest_idx] = queue[smallest_idx], queue[parent_idx]  # @step:heap-swap
            parent_idx = smallest_idx  # @step:sift-down

    return queue  # @step:complete
