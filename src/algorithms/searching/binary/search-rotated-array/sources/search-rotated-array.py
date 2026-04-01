def search_rotated_array(sorted_array: list[int], target_value: int) -> int:  # @step:initialize
    low_index = 0  # @step:initialize
    high_index = len(sorted_array) - 1  # @step:initialize

    while low_index <= high_index:
        mid_index = (low_index + high_index) // 2  # @step:compare
        mid_value = sorted_array[mid_index]  # @step:compare

        if mid_value == target_value:  # @step:compare,found
            return mid_index  # @step:found

        # Determine which half is sorted
        low_value = sorted_array[low_index]  # @step:compare
        if low_value <= mid_value:  # @step:compare
            # Left half is sorted
            if low_value <= target_value < mid_value:  # @step:eliminate
                # Target is within the sorted left half
                high_index = mid_index - 1  # @step:eliminate
            else:  # @step:eliminate
                # Target is in the right half
                low_index = mid_index + 1  # @step:eliminate
        else:  # @step:compare
            # Right half is sorted
            high_value = sorted_array[high_index]
            if mid_value < target_value <= high_value:  # @step:eliminate
                # Target is within the sorted right half
                low_index = mid_index + 1  # @step:eliminate
            else:  # @step:eliminate
                # Target is in the left half
                high_index = mid_index - 1  # @step:eliminate

    return -1  # @step:complete
