# Heap Sort Visualization — sort using max-heap tree perspective: build heap, then extract max repeatedly
def heap_sort_visualization(input_array):
    array = input_array[:]  # @step:initialize
    array_length = len(array)  # @step:initialize

    def sift_down(heap_arr, heap_size, root_idx):
        parent_idx = root_idx  # @step:sift-down
        while True:
            left_idx = 2 * parent_idx + 1  # @step:sift-down
            right_idx = 2 * parent_idx + 2  # @step:sift-down
            largest_idx = parent_idx  # @step:sift-down
            if left_idx < heap_size and heap_arr[left_idx] > heap_arr[largest_idx]:  # @step:compare
                largest_idx = left_idx  # @step:sift-down
            if right_idx < heap_size and heap_arr[right_idx] > heap_arr[largest_idx]:  # @step:compare
                largest_idx = right_idx  # @step:sift-down
            if largest_idx == parent_idx:  # @step:sift-down
                break
            heap_arr[parent_idx], heap_arr[largest_idx] = heap_arr[largest_idx], heap_arr[parent_idx]  # @step:heap-swap
            parent_idx = largest_idx  # @step:sift-down

    # Build max-heap in-place
    last_non_leaf = array_length // 2 - 1
    for node_idx in range(last_non_leaf, -1, -1):
        sift_down(array, array_length, node_idx)  # @step:sift-down

    # Extract elements one by one
    for heap_end in range(array_length - 1, 0, -1):
        array[0], array[heap_end] = array[heap_end], array[0]  # @step:heap-swap
        sift_down(array, heap_end, 0)  # @step:sift-down

    return array  # @step:complete
