def min_rotated_array(sorted_array: list[int]) -> int:  # @step:initialize
    low_index = 0  # @step:initialize
    high_index = len(sorted_array) - 1  # @step:initialize

    while low_index < high_index:
        mid_index = (low_index + high_index) // 2  # @step:compare
        mid_value = sorted_array[mid_index]  # @step:compare
        high_value = sorted_array[high_index]  # @step:compare

        if mid_value > high_value:  # @step:compare,eliminate
            # Minimum is in the right half
            low_index = mid_index + 1  # @step:eliminate
        else:  # @step:eliminate
            # Minimum is in the left half or at mid
            high_index = mid_index  # @step:eliminate

    return sorted_array[low_index]  # @step:found,complete
