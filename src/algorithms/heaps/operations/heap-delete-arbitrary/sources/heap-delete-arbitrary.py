# Heap Delete Arbitrary — remove a node at any index from a min-heap in O(log n)
def heap_delete_arbitrary(input_array, target_index):
    array = input_array[:]  # @step:initialize
    last_index = len(array) - 1  # @step:initialize

    # Replace target with the last element, then shrink the heap
    array[target_index] = array[last_index]  # @step:heap-extract
    array.pop()  # @step:heap-extract

    if target_index >= len(array):  # @step:complete
        return array

    parent_index = (target_index - 1) // 2  # @step:sift-up

    # If new value is smaller than its parent, sift up; otherwise sift down
    if target_index > 0 and array[target_index] < array[parent_index]:  # @step:sift-up
        sift_up(array, target_index)  # @step:sift-up
    else:
        sift_down(array, target_index, len(array))  # @step:sift-down

    return array  # @step:complete


def sift_up(array, start_index):
    current_index = start_index  # @step:sift-up
    while current_index > 0:
        parent_index = (current_index - 1) // 2  # @step:sift-up
        if array[current_index] >= array[parent_index]:  # @step:compare
            break
        # Swap current with parent
        array[current_index], array[parent_index] = array[parent_index], array[current_index]  # @step:heap-swap
        current_index = parent_index  # @step:sift-up


def sift_down(array, start_index, size):
    parent_index = start_index  # @step:sift-down
    while True:
        smallest_index = parent_index  # @step:sift-down
        left_index = 2 * parent_index + 1  # @step:sift-down
        right_index = 2 * parent_index + 2  # @step:sift-down
        if left_index < size and array[left_index] < array[smallest_index]:  # @step:compare
            smallest_index = left_index  # @step:sift-down
        if right_index < size and array[right_index] < array[smallest_index]:  # @step:compare
            smallest_index = right_index  # @step:sift-down
        if smallest_index == parent_index:  # @step:sift-down
            break
        # Swap parent with smallest child
        array[parent_index], array[smallest_index] = array[smallest_index], array[parent_index]  # @step:heap-swap
        parent_index = smallest_index  # @step:sift-down
