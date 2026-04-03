def heap_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    def sift_down(arr: list[int], root_index: int, heap_size: int) -> None:  # @step:compare
        largest_index = root_index  # @step:compare
        left_child = 2 * root_index + 1  # @step:compare
        right_child = 2 * root_index + 2  # @step:compare

        if left_child < heap_size and arr[left_child] > arr[largest_index]:  # @step:compare
            largest_index = left_child  # @step:compare

        if right_child < heap_size and arr[right_child] > arr[largest_index]:  # @step:compare
            largest_index = right_child  # @step:compare

        if largest_index != root_index:  # @step:swap
            temporary_value = arr[root_index]  # @step:swap
            arr[root_index] = arr[largest_index]  # @step:swap
            arr[largest_index] = temporary_value  # @step:swap

            sift_down(arr, largest_index, heap_size)  # @step:swap

    # Phase 1: Build the max-heap by sifting down from the last internal node
    for build_index in range(array_length // 2 - 1, -1, -1):  # @step:build-heap
        sift_down(sorted_array, build_index, array_length)  # @step:build-heap

    # Phase 2: Extract maximum elements one by one
    for extract_index in range(array_length - 1, 0, -1):  # @step:extract
        temporary_value = sorted_array[0]  # @step:extract
        sorted_array[0] = sorted_array[extract_index]  # @step:extract
        sorted_array[extract_index] = temporary_value  # @step:extract

        # Restore heap property after moving max to its sorted position
        sift_down(sorted_array, 0, extract_index)  # @step:compare

        # The element at extract_index is now permanently sorted
        # @step:mark-sorted

    return sorted_array  # @step:complete
