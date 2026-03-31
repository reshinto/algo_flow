# Find Median from Data Stream — maintain running median using two heaps
# maxHeap stores the lower half (root = largest of lower half, stored as negatives)
# minHeap stores the upper half (root = smallest of upper half)
def find_median_stream(stream):
    max_heap = []  # @step:initialize
    min_heap = []  # @step:initialize
    medians = []  # @step:initialize

    def sift_up_max(heap, idx):
        while idx > 0:
            parent_idx = (idx - 1) // 2  # @step:sift-up
            if heap[parent_idx] >= heap[idx]:  # @step:compare
                break
            heap[parent_idx], heap[idx] = heap[idx], heap[parent_idx]  # @step:heap-swap
            idx = parent_idx  # @step:sift-up

    def sift_down_max(heap, start_idx):
        parent_idx = start_idx  # @step:sift-down
        heap_size = len(heap)
        while True:
            largest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < heap_size and heap[left_idx] > heap[largest_idx]:  # @step:compare
                largest_idx = left_idx  # @step:sift-down
            if right_idx < heap_size and heap[right_idx] > heap[largest_idx]:  # @step:compare
                largest_idx = right_idx  # @step:sift-down
            if largest_idx == parent_idx:  # @step:sift-down
                break
            heap[parent_idx], heap[largest_idx] = heap[largest_idx], heap[parent_idx]  # @step:heap-swap
            parent_idx = largest_idx  # @step:sift-down

    def sift_up_min(heap, idx):
        while idx > 0:
            parent_idx = (idx - 1) // 2  # @step:sift-up
            if heap[parent_idx] <= heap[idx]:  # @step:compare
                break
            heap[parent_idx], heap[idx] = heap[idx], heap[parent_idx]  # @step:heap-swap
            idx = parent_idx  # @step:sift-up

    def sift_down_min(heap, start_idx):
        parent_idx = start_idx  # @step:sift-down
        heap_size = len(heap)
        while True:
            smallest_idx = parent_idx  # @step:sift-down
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            if left_idx < heap_size and heap[left_idx] < heap[smallest_idx]:  # @step:compare
                smallest_idx = left_idx  # @step:sift-down
            if right_idx < heap_size and heap[right_idx] < heap[smallest_idx]:  # @step:compare
                smallest_idx = right_idx  # @step:sift-down
            if smallest_idx == parent_idx:  # @step:sift-down
                break
            heap[parent_idx], heap[smallest_idx] = heap[smallest_idx], heap[parent_idx]  # @step:heap-swap
            parent_idx = smallest_idx  # @step:sift-down

    for num in stream:
        if len(max_heap) == 0 or num <= max_heap[0]:
            max_heap.append(num)  # @step:heap-insert
            sift_up_max(max_heap, len(max_heap) - 1)  # @step:sift-up
        else:
            min_heap.append(num)  # @step:heap-insert
            sift_up_min(min_heap, len(min_heap) - 1)  # @step:sift-up

        if len(max_heap) > len(min_heap) + 1:
            extracted = max_heap[0]  # @step:heap-extract
            max_heap[0] = max_heap[-1]  # @step:heap-extract
            max_heap.pop()  # @step:heap-extract
            sift_down_max(max_heap, 0)  # @step:sift-down
            min_heap.append(extracted)  # @step:heap-insert
            sift_up_min(min_heap, len(min_heap) - 1)  # @step:sift-up
        elif len(min_heap) > len(max_heap):
            extracted = min_heap[0]  # @step:heap-extract
            min_heap[0] = min_heap[-1]  # @step:heap-extract
            min_heap.pop()  # @step:heap-extract
            sift_down_min(min_heap, 0)  # @step:sift-down
            max_heap.append(extracted)  # @step:heap-insert
            sift_up_max(max_heap, len(max_heap) - 1)  # @step:sift-up

        if len(max_heap) == len(min_heap):
            median = (max_heap[0] + min_heap[0]) / 2  # @step:complete
        else:
            median = max_heap[0]  # @step:complete
        medians.append(median)

    return medians  # @step:complete
