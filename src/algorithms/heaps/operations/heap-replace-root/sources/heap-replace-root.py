# Heap Replace Root — replace the root with a new value and sift-down (more efficient than extract+insert)
def heap_replace_root(input_array, new_value):
    array = input_array[:]  # @step:initialize
    replaced_value = array[0]  # @step:initialize

    # Place the new value at the root
    array[0] = new_value  # @step:heap-update

    # Sift down to restore the min-heap property
    sift_down(array, 0, len(array))  # @step:sift-down

    return {"replaced_value": replaced_value, "new_heap": array}  # @step:complete


def sift_down(array, start_index, size):
    parent_index = start_index  # @step:sift-down
    while True:
        smallest_index = parent_index  # @step:sift-down
        left_index = 2 * parent_index + 1  # @step:sift-down
        right_index = 2 * parent_index + 2  # @step:sift-down
        # Find the smallest among parent, left child, and right child
        if left_index < size and array[left_index] < array[smallest_index]:  # @step:compare
            smallest_index = left_index  # @step:sift-down
        if right_index < size and array[right_index] < array[smallest_index]:  # @step:compare
            smallest_index = right_index  # @step:sift-down
        if smallest_index == parent_index:  # @step:sift-down
            break
        # Swap parent with smallest child
        array[parent_index], array[smallest_index] = array[smallest_index], array[parent_index]  # @step:heap-swap
        parent_index = smallest_index  # @step:sift-down
