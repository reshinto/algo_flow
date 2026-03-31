# Build Heap Top-Down — build a min-heap by inserting elements one-by-one with sift-up
def build_heap_top_down(input_array):
    heap = []  # @step:initialize
    # Insert each element at the end and restore heap property by sifting up
    for value in input_array:  # @step:heap-insert
        heap.append(value)  # @step:heap-insert
        sift_up(heap, len(heap) - 1)  # @step:sift-up
    return heap  # @step:complete


def sift_up(heap, start_idx):
    child_idx = start_idx  # @step:sift-up
    while child_idx > 0:
        parent_idx = (child_idx - 1) // 2  # @step:sift-up
        # If child is smaller than parent, swap to restore min-heap property
        if heap[child_idx] < heap[parent_idx]:  # @step:sift-up
            heap[child_idx], heap[parent_idx] = heap[parent_idx], heap[child_idx]  # @step:heap-swap
            child_idx = parent_idx  # @step:sift-up
        else:
            break  # @step:sift-up
