# Heap Extract Min — remove and return the minimum (root) from a min-heap, then restore heap property
def heap_extract_min(heap_array):
    array = heap_array[:]  # @step:initialize
    extracted_value = array[0]  # @step:heap-extract
    last_idx = len(array) - 1  # @step:heap-extract
    # Move last element to root and remove the last position
    array[0], array[last_idx] = array[last_idx], array[0]  # @step:heap-swap
    array.pop()  # @step:heap-extract
    # Sift down the new root to restore heap property
    size = len(array)
    parent_idx = 0  # @step:sift-down
    while True:  # @step:sift-down
        smallest_idx = parent_idx  # @step:sift-down
        left_idx = 2 * parent_idx + 1  # @step:sift-down
        right_idx = 2 * parent_idx + 2  # @step:sift-down
        # Find the smallest among parent, left child, and right child
        if left_idx < size and array[left_idx] < array[smallest_idx]:  # @step:sift-down
            smallest_idx = left_idx  # @step:sift-down
        if right_idx < size and array[right_idx] < array[smallest_idx]:  # @step:sift-down
            smallest_idx = right_idx  # @step:sift-down
        if smallest_idx == parent_idx:  # @step:sift-down
            break
        # Swap parent with smallest child
        array[parent_idx], array[smallest_idx] = array[smallest_idx], array[parent_idx]  # @step:heap-swap
        parent_idx = smallest_idx  # @step:sift-down
    return {"extracted_value": extracted_value, "remaining_heap": array}  # @step:complete
