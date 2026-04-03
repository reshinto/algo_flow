def exchange_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    for outer_index in range(array_length - 1):
        for inner_index in range(outer_index + 1, array_length):
            # @step:compare
            if sorted_array[outer_index] > sorted_array[inner_index]:  # @step:compare
                # @step:swap
                temporary_value = sorted_array[outer_index]  # @step:swap
                sorted_array[outer_index] = sorted_array[inner_index]  # @step:swap
                sorted_array[inner_index] = temporary_value  # @step:swap

        # The element at outer_index is now in its final sorted position
        # @step:mark-sorted

    return sorted_array  # @step:complete
