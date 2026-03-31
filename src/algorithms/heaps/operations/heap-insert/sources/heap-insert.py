# Heap Insert — append a value to a min-heap and restore heap property via sift-up
def heap_insert(heap_array, value):
    array = heap_array[:]  # @step:initialize
    array.append(value)  # @step:heap-insert
    current_idx = len(array) - 1  # @step:heap-insert
    # Sift up: while not at root, compare with parent and swap if smaller
    while current_idx > 0:  # @step:sift-up
        parent_idx = (current_idx - 1) // 2  # @step:sift-up
        if array[current_idx] >= array[parent_idx]:  # @step:sift-up
            break
        # Swap with parent to restore heap property
        array[current_idx], array[parent_idx] = array[parent_idx], array[current_idx]  # @step:heap-swap
        current_idx = parent_idx  # @step:sift-up
    return array  # @step:complete
