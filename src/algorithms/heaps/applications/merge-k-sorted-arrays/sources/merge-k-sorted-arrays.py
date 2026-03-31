# Merge K Sorted Arrays — merge k sorted arrays into one sorted array using a min-heap
def merge_k_sorted_arrays(arrays):
    result = []  # @step:initialize
    # Min-heap entries: [value, array_index, element_index]
    heap = []  # @step:initialize

    # Insert first element of each array into the heap
    for array_index in range(len(arrays)):  # @step:initialize
        if arrays[array_index]:  # @step:initialize
            heap.append([arrays[array_index][0], array_index, 0])  # @step:heap-insert

    # Build initial min-heap using sift-up for each inserted element
    for inserted_idx in range(1, len(heap)):  # @step:sift-up
        child_idx = inserted_idx  # @step:sift-up
        while child_idx > 0:  # @step:sift-up
            parent_idx = (child_idx - 1) // 2  # @step:sift-up
            if heap[parent_idx][0] <= heap[child_idx][0]:  # @step:compare
                break
            heap[parent_idx], heap[child_idx] = heap[child_idx], heap[parent_idx]  # @step:heap-swap
            child_idx = parent_idx  # @step:sift-up

    # Extract min and insert next element from the same array
    while heap:
        min_value, array_index, element_index = heap[0]  # @step:heap-extract
        result.append(min_value)  # @step:heap-extract

        next_element_index = element_index + 1  # @step:heap-extract
        if next_element_index < len(arrays[array_index]):
            # Replace root with next element from the same array
            heap[0] = [arrays[array_index][next_element_index], array_index, next_element_index]  # @step:heap-insert
        else:
            # No more elements in this array — remove root by moving last to root
            last_entry = heap.pop()  # @step:heap-extract
            if heap:
                heap[0] = last_entry  # @step:heap-extract

        # Sift down the root to restore heap property
        if len(heap) > 1:
            parent_idx = 0  # @step:sift-down
            while True:  # @step:sift-down
                smallest_idx = parent_idx  # @step:sift-down
                left_idx = 2 * parent_idx + 1  # @step:sift-down
                right_idx = 2 * parent_idx + 2  # @step:sift-down
                if left_idx < len(heap) and heap[left_idx][0] < heap[smallest_idx][0]:  # @step:compare
                    smallest_idx = left_idx  # @step:sift-down
                if right_idx < len(heap) and heap[right_idx][0] < heap[smallest_idx][0]:  # @step:compare
                    smallest_idx = right_idx  # @step:sift-down
                if smallest_idx == parent_idx:  # @step:sift-down
                    break
                heap[parent_idx], heap[smallest_idx] = heap[smallest_idx], heap[parent_idx]  # @step:heap-swap
                parent_idx = smallest_idx  # @step:sift-down

    return result  # @step:complete
