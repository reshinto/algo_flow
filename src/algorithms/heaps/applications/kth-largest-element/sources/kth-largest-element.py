# Kth Largest Element — find the kth largest element using a min-heap of size k
def kth_largest_element(array, k_value):
    min_heap = []  # @step:initialize

    def sift_up(heap, idx):
        while idx > 0:
            parent_idx = (idx - 1) // 2  # @step:sift-up
            if heap[parent_idx] <= heap[idx]:  # @step:compare
                break
            heap[parent_idx], heap[idx] = heap[idx], heap[parent_idx]  # @step:heap-swap
            idx = parent_idx  # @step:sift-up

    def sift_down(heap, start_idx, size):
        parent_idx = start_idx  # @step:sift-down
        while True:
            smallest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < size and heap[left_idx] < heap[smallest_idx]:  # @step:compare
                smallest_idx = left_idx  # @step:sift-down
            if right_idx < size and heap[right_idx] < heap[smallest_idx]:  # @step:compare
                smallest_idx = right_idx  # @step:sift-down
            if smallest_idx == parent_idx:  # @step:sift-down
                break
            heap[parent_idx], heap[smallest_idx] = heap[smallest_idx], heap[parent_idx]  # @step:heap-swap
            parent_idx = smallest_idx  # @step:sift-down

    for element in array:
        if len(min_heap) < k_value:
            min_heap.append(element)  # @step:heap-insert
            sift_up(min_heap, len(min_heap) - 1)  # @step:sift-up
        elif element > min_heap[0]:  # @step:compare
            min_heap[0] = element  # @step:heap-extract
            sift_down(min_heap, 0, len(min_heap))  # @step:sift-down

    return min_heap[0]  # @step:complete
