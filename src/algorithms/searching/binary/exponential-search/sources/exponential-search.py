def exponential_search(sorted_array: list[int], target_value: int) -> int:
    array_length = len(sorted_array)  # @step:initialize
    if array_length == 0:
        return -1  # @step:complete

    if sorted_array[0] == target_value:  # @step:visit
        return 0  # @step:found

    # Phase 1: exponential probing to find the upper bound
    bound_index = 1  # @step:visit
    while bound_index < array_length and sorted_array[bound_index] <= target_value:  # @step:visit
        bound_index = bound_index * 2  # @step:visit

    # Phase 2: binary search in the range [bound_index//2, min(bound_index, length-1)]
    low_index = bound_index // 2  # @step:compare
    high_index = min(bound_index, array_length - 1)  # @step:compare

    while low_index <= high_index:
        mid_index = (low_index + high_index) // 2  # @step:compare
        mid_value = sorted_array[mid_index]  # @step:compare

        if mid_value == target_value:  # @step:compare,found
            return mid_index  # @step:found
        elif mid_value < target_value:  # @step:eliminate
            low_index = mid_index + 1  # @step:eliminate
        else:  # @step:eliminate
            high_index = mid_index - 1  # @step:eliminate

    return -1  # @step:complete
