def lower_bound_search(sorted_array: list[int], target_value: int) -> int:
    low_index = 0  # @step:initialize
    high_index = len(sorted_array)  # @step:initialize
    result_index = len(sorted_array)  # @step:initialize

    while low_index < high_index:
        mid_index = (low_index + high_index) // 2  # @step:compare
        mid_value = sorted_array[mid_index]  # @step:compare

        if mid_value >= target_value:  # @step:compare,found
            # mid_value is a candidate — record it and search for an earlier occurrence
            result_index = mid_index  # @step:found
            high_index = mid_index  # @step:eliminate
        else:  # @step:eliminate
            # mid_value is too small — the lower bound must be to the right
            low_index = mid_index + 1  # @step:eliminate

    return result_index  # @step:complete
