# Heap Decrease Key — decrease the value at a given index in a min-heap, then sift-up
def heap_decrease_key(input_array, target_index, new_value):
    array = input_array[:]  # @step:initialize

    # Update the value at target_index to the new (smaller) value
    array[target_index] = new_value  # @step:heap-update

    # Sift up to restore the min-heap property
    sift_up(array, target_index)  # @step:sift-up

    return array  # @step:complete


def sift_up(array, start_index):
    current_index = start_index  # @step:sift-up
    while current_index > 0:
        parent_index = (current_index - 1) // 2  # @step:sift-up
        if array[current_index] >= array[parent_index]:  # @step:compare
            break
        # Swap current with parent — current value is smaller, move it up
        array[current_index], array[parent_index] = array[parent_index], array[current_index]  # @step:heap-swap
        current_index = parent_index  # @step:sift-up
