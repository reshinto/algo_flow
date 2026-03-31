# Top-K Frequent Elements (Heap) — find k most frequent elements using a min-heap of size k
def top_k_frequent_heap(array, k_value):
    # Count frequencies of each element
    frequency_map = {}  # @step:initialize
    for element in array:  # @step:initialize
        frequency_map[element] = frequency_map.get(element, 0) + 1  # @step:initialize
    # Min-heap: each entry is [frequency, element], heap ordered by frequency
    heap = []  # @step:initialize
    entries = list(frequency_map.items())  # @step:initialize

    # Process each unique element
    for element, frequency in entries:
        if len(heap) < k_value:
            # Heap not full — insert and sift up
            heap.append([frequency, element])  # @step:heap-insert
            child_idx = len(heap) - 1  # @step:sift-up
            while child_idx > 0:  # @step:sift-up
                parent_idx = (child_idx - 1) // 2  # @step:sift-up
                if heap[parent_idx][0] <= heap[child_idx][0]:  # @step:compare
                    break
                # Swap child with parent
                heap[parent_idx], heap[child_idx] = heap[child_idx], heap[parent_idx]  # @step:heap-swap
                child_idx = parent_idx  # @step:sift-up
        elif frequency > heap[0][0]:
            # Current freq beats root (lowest in heap) — replace root and sift down
            heap[0] = [frequency, element]  # @step:heap-extract
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

    # Extract elements from the heap (the k most frequent)
    return [entry[1] for entry in heap]  # @step:complete
