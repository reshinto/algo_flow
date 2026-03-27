# Build Min Heap — convert an arbitrary array into a valid min-heap in-place using sift-down
def build_min_heap(input_array):
    array = input_array[:]  # @step:initialize
    size = len(array)  # @step:initialize
    # Start from last non-leaf node and sift down each node toward root
    for start_idx in range(size // 2 - 1, -1, -1):  # @step:sift-down
        sift_down(array, start_idx, size)  # @step:sift-down
    return array  # @step:complete


def sift_down(array, start_idx, size):
    parent_idx = start_idx  # @step:sift-down
    while True:
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
        # Swap parent with the smallest child
        array[parent_idx], array[smallest_idx] = array[smallest_idx], array[parent_idx]  # @step:heap-swap
        parent_idx = smallest_idx  # @step:sift-down
