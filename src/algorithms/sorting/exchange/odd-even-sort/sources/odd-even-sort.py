def odd_even_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    is_sorted = False  # @step:initialize

    while not is_sorted:
        is_sorted = True

        # Odd phase: compare pairs at (1,2), (3,4), (5,6), ...
        # @step:odd-phase
        for odd_index in range(1, array_length - 1, 2):  # @step:compare
            if sorted_array[odd_index] > sorted_array[odd_index + 1]:  # @step:compare
                # @step:swap
                temporary_value = sorted_array[odd_index]  # @step:swap
                sorted_array[odd_index] = sorted_array[odd_index + 1]  # @step:swap
                sorted_array[odd_index + 1] = temporary_value  # @step:swap
                is_sorted = False

        # Even phase: compare pairs at (0,1), (2,3), (4,5), ...
        # @step:even-phase
        for even_index in range(0, array_length - 1, 2):  # @step:compare
            if sorted_array[even_index] > sorted_array[even_index + 1]:  # @step:compare
                # @step:swap
                temporary_value = sorted_array[even_index]  # @step:swap
                sorted_array[even_index] = sorted_array[even_index + 1]  # @step:swap
                sorted_array[even_index + 1] = temporary_value  # @step:swap
                is_sorted = False

    # All elements are in their sorted positions
    # @step:mark-sorted

    return sorted_array  # @step:complete
