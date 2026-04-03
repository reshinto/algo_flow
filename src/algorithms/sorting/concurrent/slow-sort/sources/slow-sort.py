def slow_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize

    def slow_sort_range(start_index: int, end_index: int) -> None:
        if start_index >= end_index:
            return

        mid_index = (start_index + end_index) // 2

        slow_sort_range(start_index, mid_index)  # Sort first half
        slow_sort_range(mid_index + 1, end_index)  # Sort second half

        # Find the maximum of both halves (now at their respective ends)
        # @step:compare
        if sorted_array[mid_index] > sorted_array[end_index]:
            # @step:swap
            temporary_value = sorted_array[mid_index]  # @step:swap
            sorted_array[mid_index] = sorted_array[end_index]  # @step:swap
            sorted_array[end_index] = temporary_value  # @step:swap

        # The maximum is now at end_index — recursively sort the rest
        slow_sort_range(start_index, end_index - 1)  # @step:mark-sorted

    slow_sort_range(0, len(sorted_array) - 1)

    return sorted_array  # @step:complete
