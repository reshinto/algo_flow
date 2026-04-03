import math

def stooge_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize

    def stooge_sort_range(start_index: int, end_index: int) -> None:
        if start_index >= end_index:
            return

        # @step:compare
        if sorted_array[start_index] > sorted_array[end_index]:
            # @step:swap
            temporary_value = sorted_array[start_index]  # @step:swap
            sorted_array[start_index] = sorted_array[end_index]  # @step:swap
            sorted_array[end_index] = temporary_value  # @step:swap

        range_length = end_index - start_index + 1
        if range_length > 2:
            third_length = range_length // 3

            stooge_sort_range(start_index, end_index - third_length)  # Sort first 2/3
            stooge_sort_range(start_index + third_length, end_index)  # Sort last 2/3
            stooge_sort_range(start_index, end_index - third_length)  # Sort first 2/3 again

    stooge_sort_range(0, len(sorted_array) - 1)

    # @step:mark-sorted

    return sorted_array  # @step:complete
