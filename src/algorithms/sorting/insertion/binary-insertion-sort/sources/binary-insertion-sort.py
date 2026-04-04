def binary_insertion_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    for outer_index in range(1, array_length):
        current_element = sorted_array[outer_index]  # @step:binary-search
        search_left = 0  # @step:binary-search
        search_right = outer_index - 1  # @step:binary-search

        # Binary search for the correct insertion position
        while search_left <= search_right:
            mid_index = (search_left + search_right) // 2  # @step:compare
            if current_element < sorted_array[mid_index]:  # @step:compare
                search_right = mid_index - 1  # @step:compare
            else:
                search_left = mid_index + 1  # @step:compare

        # Shift elements right to make room for current_element
        shift_index = outer_index - 1  # @step:swap
        while shift_index >= search_left:  # @step:swap
            sorted_array[shift_index + 1] = sorted_array[shift_index]  # @step:swap
            shift_index -= 1  # @step:swap
        sorted_array[search_left] = current_element  # @step:swap

        # Element is now in its sorted position within the sorted prefix
        # @step:mark-sorted

    return sorted_array  # @step:complete
