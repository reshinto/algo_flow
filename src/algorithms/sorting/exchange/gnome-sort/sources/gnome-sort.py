def gnome_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    position = 0  # @step:initialize

    while position < array_length:
        if position == 0:
            # @step:move-forward
            position += 1  # @step:move-forward
        else:
            # @step:compare
            if sorted_array[position] >= sorted_array[position - 1]:  # @step:compare
                # Elements are in order — move forward
                # @step:move-forward
                position += 1  # @step:move-forward
            else:
                # Elements are out of order — swap and step back
                # @step:swap
                temporary_value = sorted_array[position]  # @step:swap
                sorted_array[position] = sorted_array[position - 1]  # @step:swap
                sorted_array[position - 1] = temporary_value  # @step:swap
                position -= 1  # @step:swap

    # All elements are in their sorted positions
    # @step:mark-sorted

    return sorted_array  # @step:complete
