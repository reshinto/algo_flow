# Ugly Number II — find the nth ugly number (only prime factors 2, 3, 5) using a min-heap
def ugly_number_ii(nth_position):
    heap = [1]  # @step:initialize
    seen = {1}  # @step:initialize
    prime_factors = [2, 3, 5]  # @step:initialize
    current_ugly = 1  # @step:initialize

    def sift_up(heap_arr, idx):
        current_idx = idx  # @step:sift-up
        while current_idx > 0:
            parent_idx = (current_idx - 1) // 2  # @step:sift-up
            if heap_arr[current_idx] < heap_arr[parent_idx]:  # @step:compare
                heap_arr[current_idx], heap_arr[parent_idx] = heap_arr[parent_idx], heap_arr[current_idx]  # @step:heap-swap
                current_idx = parent_idx  # @step:sift-up
            else:
                break  # @step:compare

    def sift_down(heap_arr, heap_size, start_idx):
        parent_idx = start_idx  # @step:sift-down
        while True:
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            smallest_idx = parent_idx  # @step:sift-down
            if left_idx < heap_size and heap_arr[left_idx] < heap_arr[smallest_idx]:  # @step:compare
                smallest_idx = left_idx  # @step:sift-down
            if right_idx < heap_size and heap_arr[right_idx] < heap_arr[smallest_idx]:  # @step:compare
                smallest_idx = right_idx  # @step:sift-down
            if smallest_idx == parent_idx:  # @step:sift-down
                break
            heap_arr[parent_idx], heap_arr[smallest_idx] = heap_arr[smallest_idx], heap_arr[parent_idx]  # @step:heap-swap
            parent_idx = smallest_idx  # @step:sift-down

    for _ in range(nth_position):
        current_ugly = heap[0]  # @step:heap-extract
        heap[0] = heap[-1]  # @step:heap-extract
        heap.pop()  # @step:heap-extract
        sift_down(heap, len(heap), 0)  # @step:sift-down
        for factor in prime_factors:
            candidate = current_ugly * factor  # @step:heap-insert
            if candidate not in seen:
                seen.add(candidate)  # @step:heap-insert
                heap.append(candidate)  # @step:heap-insert
                sift_up(heap, len(heap) - 1)  # @step:sift-up

    return current_ugly  # @step:complete
