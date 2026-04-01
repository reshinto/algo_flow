def sqrt_binary_search(target_value: int) -> int:  # @step:initialize
    if target_value < 2:  # @step:initialize
        return target_value  # @step:initialize
    low_index = 1  # @step:initialize
    high_index = target_value // 2  # @step:initialize
    result_index = 0  # @step:initialize

    while low_index <= high_index:
        mid_index = (low_index + high_index) // 2  # @step:compare
        mid_squared = mid_index * mid_index  # @step:compare

        if mid_squared == target_value:  # @step:compare,found
            return mid_index  # @step:found
        elif mid_squared < target_value:  # @step:eliminate
            # mid_index is a candidate floor — search for a larger value
            result_index = mid_index  # @step:eliminate
            low_index = mid_index + 1  # @step:eliminate
        else:  # @step:eliminate
            # mid_index is too large — search left
            high_index = mid_index - 1  # @step:eliminate

    return result_index  # @step:complete
