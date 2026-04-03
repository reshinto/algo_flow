def shell_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    # Start with half the array length and halve the gap each pass
    gap_size = array_length // 2  # @step:gap-update
    while gap_size > 0:  # @step:gap-update

        # Perform a gapped insertion sort for this gap size
        for outer_index in range(gap_size, array_length):  # @step:compare
            current_value = sorted_array[outer_index]  # @step:compare
            inner_index = outer_index  # @step:compare

            # Shift elements that are larger than current_value by gap_size positions
            while inner_index >= gap_size and sorted_array[inner_index - gap_size] > current_value:  # @step:compare
                sorted_array[inner_index] = sorted_array[inner_index - gap_size]  # @step:swap
                inner_index -= gap_size  # @step:swap

            # Place current_value in its gap-relative sorted position
            sorted_array[inner_index] = current_value  # @step:swap

        # When gap reduces to 1 the final pass is a standard insertion sort
        # @step:mark-sorted
        gap_size //= 2  # @step:gap-update

    return sorted_array  # @step:complete
