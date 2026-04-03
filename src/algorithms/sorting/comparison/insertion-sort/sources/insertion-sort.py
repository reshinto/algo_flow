def insertion_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    for outer_index in range(1, array_length):  # @step:outer-loop
        current_value = sorted_array[outer_index]  # @step:outer-loop
        inner_index = outer_index - 1  # @step:outer-loop

        # Shift elements that are greater than current_value one position to the right
        while inner_index >= 0 and sorted_array[inner_index] > current_value:  # @step:compare
            sorted_array[inner_index + 1] = sorted_array[inner_index]  # @step:swap
            inner_index -= 1  # @step:swap

        # Place current_value in its correct sorted position
        sorted_array[inner_index + 1] = current_value  # @step:mark-sorted

    return sorted_array  # @step:complete
