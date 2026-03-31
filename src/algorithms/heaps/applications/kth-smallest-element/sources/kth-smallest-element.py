# Kth Smallest Element — find the kth smallest element using a max-heap of size k
def kth_smallest_element(array, k_value):
    max_heap = []  # @step:initialize

    def sift_up(heap, idx):
        while idx > 0:
            parent_idx = (idx - 1) // 2  # @step:sift-up
            if heap[parent_idx] >= heap[idx]:  # @step:compare
                break
            heap[parent_idx], heap[idx] = heap[idx], heap[parent_idx]  # @step:heap-swap
            idx = parent_idx  # @step:sift-up

    def sift_down(heap, start_idx, size):
        parent_idx = start_idx  # @step:sift-down
        while True:
            largest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < size and heap[left_idx] > heap[largest_idx]:  # @step:compare
                largest_idx = left_idx  # @step:sift-down
            if right_idx < size and heap[right_idx] > heap[largest_idx]:  # @step:compare
                largest_idx = right_idx  # @step:sift-down
            if largest_idx == parent_idx:  # @step:sift-down
                break
            heap[parent_idx], heap[largest_idx] = heap[largest_idx], heap[parent_idx]  # @step:heap-swap
            parent_idx = largest_idx  # @step:sift-down

    for element in array:
        if len(max_heap) < k_value:
            max_heap.append(element)  # @step:heap-insert
            sift_up(max_heap, len(max_heap) - 1)  # @step:sift-up
        elif element < max_heap[0]:  # @step:compare
            max_heap[0] = element  # @step:heap-extract
            sift_down(max_heap, 0, len(max_heap))  # @step:sift-down

    return max_heap[0]  # @step:complete
