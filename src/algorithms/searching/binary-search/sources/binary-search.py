def binary_search(sorted_array: list[int], target_value: int) -> int:  # @step:initialize
    low_index = 0  # @step:initialize
    high_index = len(sorted_array) - 1  # @step:initialize

    while low_index <= high_index:
        mid_index = (low_index + high_index) // 2  # @step:compare
        mid_value = sorted_array[mid_index]  # @step:compare

        if mid_value == target_value:  # @step:compare,found
            return mid_index  # @step:found
        elif mid_value < target_value:  # @step:eliminate
            # Target is in the upper half
            low_index = mid_index + 1  # @step:eliminate
        else:  # @step:eliminate
            # Target is in the lower half
            high_index = mid_index - 1  # @step:eliminate

    return -1  # @step:complete
