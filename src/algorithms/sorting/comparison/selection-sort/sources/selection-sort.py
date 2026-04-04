def selection_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    for outer_index in range(array_length - 1):  # @step:outer-loop
        minimum_index = outer_index  # @step:outer-loop

        # Scan the unsorted portion for the minimum element
        for inner_index in range(outer_index + 1, array_length):  # @step:compare
            if sorted_array[inner_index] < sorted_array[minimum_index]:  # @step:compare
                minimum_index = inner_index  # @step:compare

        # Swap the minimum into position if it is not already there
        if minimum_index != outer_index:  # @step:swap
            temporary_value = sorted_array[outer_index]  # @step:swap
            sorted_array[outer_index] = sorted_array[minimum_index]  # @step:swap
            sorted_array[minimum_index] = temporary_value  # @step:swap

        # The element at outer_index is now permanently in its sorted position
        # @step:mark-sorted

    return sorted_array  # @step:complete
