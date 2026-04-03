def cocktail_shaker_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    left_bound = 0  # @step:initialize
    right_bound = array_length - 1  # @step:initialize
    swapped = True  # @step:initialize

    while swapped:
        swapped = False

        # Forward pass: left to right — bubble largest unsorted element to right_bound
        # @step:forward-pass
        for forward_index in range(left_bound, right_bound):  # @step:compare
            if sorted_array[forward_index] > sorted_array[forward_index + 1]:  # @step:compare
                # @step:swap
                temporary_value = sorted_array[forward_index]  # @step:swap
                sorted_array[forward_index] = sorted_array[forward_index + 1]  # @step:swap
                sorted_array[forward_index + 1] = temporary_value  # @step:swap
                swapped = True  # @step:swap

        # The rightmost unsorted element is now sorted
        # @step:mark-sorted
        right_bound -= 1

        if not swapped:
            break
        swapped = False

        # Backward pass: right to left — bubble smallest unsorted element to left_bound
        # @step:backward-pass
        for backward_index in range(right_bound, left_bound, -1):  # @step:compare
            if sorted_array[backward_index - 1] > sorted_array[backward_index]:  # @step:compare
                # @step:swap
                temporary_value = sorted_array[backward_index]  # @step:swap
                sorted_array[backward_index] = sorted_array[backward_index - 1]  # @step:swap
                sorted_array[backward_index - 1] = temporary_value  # @step:swap
                swapped = True  # @step:swap

        # The leftmost unsorted element is now sorted
        # @step:mark-sorted
        left_bound += 1

    return sorted_array  # @step:complete
