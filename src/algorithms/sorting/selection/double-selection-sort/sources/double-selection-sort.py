def double_selection_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    left_bound = 0  # @step:initialize
    right_bound = array_length - 1  # @step:initialize

    while left_bound < right_bound:
        minimum_index = left_bound  # @step:compare
        maximum_index = left_bound  # @step:compare

        # Scan between bounds to find both minimum and maximum
        for scan_index in range(left_bound + 1, right_bound + 1):  # @step:compare
            if sorted_array[scan_index] < sorted_array[minimum_index]:  # @step:compare
                minimum_index = scan_index  # @step:compare
            if sorted_array[scan_index] > sorted_array[maximum_index]:  # @step:compare
                maximum_index = scan_index  # @step:compare

        # Swap minimum to left bound
        if minimum_index != left_bound:  # @step:swap
            temporary_min = sorted_array[left_bound]  # @step:swap
            sorted_array[left_bound] = sorted_array[minimum_index]  # @step:swap
            sorted_array[minimum_index] = temporary_min  # @step:swap
            # If maximum was at left_bound, it moved to minimum_index
            if maximum_index == left_bound:  # @step:swap
                maximum_index = minimum_index  # @step:swap

        # Swap maximum to right bound
        if maximum_index != right_bound:  # @step:swap
            temporary_max = sorted_array[right_bound]  # @step:swap
            sorted_array[right_bound] = sorted_array[maximum_index]  # @step:swap
            sorted_array[maximum_index] = temporary_max  # @step:swap

        # Both ends are now in their sorted positions
        # @step:mark-sorted
        left_bound += 1  # @step:mark-sorted
        right_bound -= 1  # @step:mark-sorted

    return sorted_array  # @step:complete
