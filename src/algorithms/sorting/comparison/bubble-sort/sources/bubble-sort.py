def bubble_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    for outer_index in range(array_length - 1):  # @step:outer-loop,mark-sorted
        swapped_this_pass = False  # @step:outer-loop

        # Each pass bubbles the next-largest element into position
        for inner_index in range(array_length - 1 - outer_index):  # @step:inner-loop
            if sorted_array[inner_index] > sorted_array[inner_index + 1]:  # @step:compare
                temporary_value = sorted_array[inner_index]  # @step:swap
                sorted_array[inner_index] = sorted_array[inner_index + 1]  # @step:swap
                sorted_array[inner_index + 1] = temporary_value  # @step:swap
                swapped_this_pass = True  # @step:swap

        # No swaps means already sorted — exit early
        if not swapped_this_pass:  # @step:early-exit
            break  # @step:early-exit

    return sorted_array  # @step:complete
