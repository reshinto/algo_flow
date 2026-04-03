import math

def comb_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    shrink_factor = 1.3  # @step:initialize
    gap = array_length  # @step:initialize
    is_sorted = False  # @step:initialize

    while not is_sorted:
        # Shrink the gap by the shrink factor
        # @step:gap-update
        gap = math.floor(gap / shrink_factor)  # @step:gap-update
        if gap <= 1:
            gap = 1
            is_sorted = True  # assume sorted until a swap proves otherwise

        # Perform a pass with the current gap
        for start_index in range(array_length - gap):  # @step:compare
            compare_index = start_index + gap
            if sorted_array[start_index] > sorted_array[compare_index]:  # @step:compare
                # @step:swap
                temporary_value = sorted_array[start_index]  # @step:swap
                sorted_array[start_index] = sorted_array[compare_index]  # @step:swap
                sorted_array[compare_index] = temporary_value  # @step:swap
                is_sorted = False  # a swap occurred — need another pass

    # All elements are now in their sorted positions
    # @step:mark-sorted

    return sorted_array  # @step:complete
