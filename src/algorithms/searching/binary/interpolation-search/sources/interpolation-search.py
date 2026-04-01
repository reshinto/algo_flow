def interpolation_search(sorted_array: list[int], target_value: int) -> int:
    low_index = 0  # @step:initialize
    high_index = len(sorted_array) - 1  # @step:initialize

    while (
        low_index <= high_index
        and target_value >= sorted_array[low_index]
        and target_value <= sorted_array[high_index]
    ):
        low_value = sorted_array[low_index]  # @step:compare
        high_value = sorted_array[high_index]  # @step:compare

        # Guard against division by zero when all elements in range are equal
        if high_value == low_value:  # @step:compare
            if low_value == target_value:
                return low_index  # @step:found
            break  # @step:complete

        # Interpolation formula — estimate position based on value distribution
        position_index = low_index + (
            (target_value - low_value) * (high_index - low_index) // (high_value - low_value)
        )  # @step:compare

        position_value = sorted_array[position_index]  # @step:compare

        if position_value == target_value:  # @step:compare,found
            return position_index  # @step:found
        elif position_value < target_value:  # @step:eliminate
            low_index = position_index + 1  # @step:eliminate
        else:  # @step:eliminate
            high_index = position_index - 1  # @step:eliminate

    return -1  # @step:complete
