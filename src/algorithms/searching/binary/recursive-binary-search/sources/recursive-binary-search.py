def recursive_binary_search(sorted_array: list[int], target_value: int) -> int:  # @step:initialize
    def search_range(low_index: int, high_index: int) -> int:  # @step:initialize
        if low_index > high_index:  # @step:complete
            return -1  # @step:complete

        mid_index = (low_index + high_index) // 2  # @step:compare
        mid_value = sorted_array[mid_index]  # @step:compare

        if mid_value == target_value:  # @step:compare,found
            return mid_index  # @step:found
        elif mid_value < target_value:  # @step:eliminate
            # Target is in the upper half
            return search_range(mid_index + 1, high_index)  # @step:eliminate
        else:  # @step:eliminate
            # Target is in the lower half
            return search_range(low_index, mid_index - 1)  # @step:eliminate

    return search_range(0, len(sorted_array) - 1)  # @step:complete
