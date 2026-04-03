def cycle_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    for cycle_start in range(array_length - 1):  # @step:count-position
        current_value = sorted_array[cycle_start]  # @step:count-position

        # Find the correct position for current_value
        correct_position = cycle_start  # @step:count-position
        for scan_index in range(cycle_start + 1, array_length):  # @step:compare
            if sorted_array[scan_index] < current_value:  # @step:compare
                correct_position += 1  # @step:count-position

        # If the item is already in the correct position, skip this cycle
        if correct_position == cycle_start:  # @step:count-position
            continue  # @step:count-position

        # Skip over duplicates to find the unique insertion point
        while current_value == sorted_array[correct_position]:  # @step:count-position
            correct_position += 1  # @step:count-position

        # Place current_value at its correct position
        displaced_value = sorted_array[correct_position]  # @step:swap
        sorted_array[correct_position] = current_value  # @step:swap
        current_value = displaced_value  # @step:swap

        # Rotate the rest of the cycle
        while correct_position != cycle_start:  # @step:count-position
            correct_position = cycle_start  # @step:count-position

            for scan_index in range(cycle_start + 1, array_length):  # @step:compare
                if sorted_array[scan_index] < current_value:  # @step:compare
                    correct_position += 1  # @step:count-position

            while current_value == sorted_array[correct_position]:  # @step:count-position
                correct_position += 1  # @step:count-position

            if current_value != sorted_array[correct_position]:  # @step:swap
                next_displaced_value = sorted_array[correct_position]  # @step:swap
                sorted_array[correct_position] = current_value  # @step:swap
                current_value = next_displaced_value  # @step:swap

        # @step:mark-sorted

    # @step:mark-sorted
    return sorted_array  # @step:complete
