def pancake_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    for unsorted_size in range(array_length, 1, -1):
        # Find the index of the maximum element in the unsorted portion
        # @step:find-max
        max_index = 0  # @step:find-max
        for search_index in range(1, unsorted_size):  # @step:compare
            if sorted_array[search_index] > sorted_array[max_index]:  # @step:compare
                max_index = search_index  # @step:compare

        # If the max is not already at the end, flip it there
        if max_index != unsorted_size - 1:
            # Flip max to front if not already there
            if max_index != 0:
                # @step:flip
                flip_left = 0  # @step:flip
                flip_right = max_index  # @step:flip
                while flip_left < flip_right:
                    # @step:swap
                    temporary_value = sorted_array[flip_left]  # @step:swap
                    sorted_array[flip_left] = sorted_array[flip_right]  # @step:swap
                    sorted_array[flip_right] = temporary_value  # @step:swap
                    flip_left += 1
                    flip_right -= 1

            # Flip front to end of unsorted portion
            # @step:flip
            flip_left = 0  # @step:flip
            flip_right = unsorted_size - 1  # @step:flip
            while flip_left < flip_right:
                # @step:swap
                temporary_value = sorted_array[flip_left]  # @step:swap
                sorted_array[flip_left] = sorted_array[flip_right]  # @step:swap
                sorted_array[flip_right] = temporary_value  # @step:swap
                flip_left += 1
                flip_right -= 1

        # The element at unsorted_size - 1 is now in its sorted position
        # @step:mark-sorted

    return sorted_array  # @step:complete
