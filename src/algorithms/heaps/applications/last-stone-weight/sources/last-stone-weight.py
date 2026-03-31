# Last Stone Weight — repeatedly smash the two heaviest stones, return the last remaining weight
def last_stone_weight(stones):
    heap = stones[:]  # @step:initialize
    heap_size = len(heap)

    # Build max-heap using Floyd's algorithm
    for start_idx in range(heap_size // 2 - 1, -1, -1):  # @step:sift-down
        parent_idx = start_idx  # @step:sift-down
        while True:
            largest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < len(heap) and heap[left_idx] > heap[largest_idx]:  # @step:compare
                largest_idx = left_idx  # @step:sift-down
            if right_idx < len(heap) and heap[right_idx] > heap[largest_idx]:  # @step:compare
                largest_idx = right_idx  # @step:sift-down
            if largest_idx == parent_idx:  # @step:sift-down
                break
            heap[parent_idx], heap[largest_idx] = heap[largest_idx], heap[parent_idx]  # @step:heap-swap
            parent_idx = largest_idx  # @step:sift-down

    def extract_max(arr):
        max_value = arr[0]  # @step:heap-extract
        arr[0] = arr[-1]  # @step:heap-swap
        arr.pop()  # @step:heap-extract
        parent_idx = 0  # @step:sift-down
        while True:
            largest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < len(arr) and arr[left_idx] > arr[largest_idx]:  # @step:compare
                largest_idx = left_idx  # @step:sift-down
            if right_idx < len(arr) and arr[right_idx] > arr[largest_idx]:  # @step:compare
                largest_idx = right_idx  # @step:sift-down
            if largest_idx == parent_idx:  # @step:sift-down
                break
            arr[parent_idx], arr[largest_idx] = arr[largest_idx], arr[parent_idx]  # @step:heap-swap
            parent_idx = largest_idx  # @step:sift-down
        return max_value

    def insert_value(arr, value):
        arr.append(value)  # @step:heap-insert
        current_idx = len(arr) - 1  # @step:sift-up
        while current_idx > 0:
            parent_idx = (current_idx - 1) // 2  # @step:sift-up
            if arr[parent_idx] >= arr[current_idx]:  # @step:compare
                break
            arr[parent_idx], arr[current_idx] = arr[current_idx], arr[parent_idx]  # @step:heap-swap
            current_idx = parent_idx  # @step:sift-up

    while len(heap) >= 2:
        heaviest = extract_max(heap)  # @step:heap-extract
        second_heaviest = extract_max(heap)  # @step:heap-extract
        if heaviest != second_heaviest:  # @step:compare
            insert_value(heap, heaviest - second_heaviest)  # @step:heap-insert

    return 0 if len(heap) == 0 else heap[0]  # @step:complete
