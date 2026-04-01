def ternary_search(sorted_array: list[int], target_value: int) -> int:  # @step:initialize
    low_index = 0  # @step:initialize
    high_index = len(sorted_array) - 1  # @step:initialize

    while low_index <= high_index:
        range_size = high_index - low_index  # @step:compare
        mid1_index = low_index + range_size // 3  # @step:compare
        mid2_index = high_index - range_size // 3  # @step:compare

        mid1_value = sorted_array[mid1_index]  # @step:compare
        mid2_value = sorted_array[mid2_index]  # @step:compare

        if mid1_value == target_value:  # @step:compare,found
            return mid1_index  # @step:found

        if mid2_value == target_value:  # @step:compare,found
            return mid2_index  # @step:found

        if target_value < mid1_value:  # @step:eliminate
            # Target is in the left third
            high_index = mid1_index - 1  # @step:eliminate
        elif target_value > mid2_value:  # @step:eliminate
            # Target is in the right third
            low_index = mid2_index + 1  # @step:eliminate
        else:  # @step:eliminate
            # Target is in the middle third
            low_index = mid1_index + 1  # @step:eliminate
            high_index = mid2_index - 1  # @step:eliminate

    return -1  # @step:complete
