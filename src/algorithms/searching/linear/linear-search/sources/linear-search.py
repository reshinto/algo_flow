def linear_search(array: list[int], target_value: int) -> int:  # @step:initialize
    for current_index in range(len(array)):  # @step:visit
        current_value = array[current_index]  # @step:compare
        if current_value == target_value:  # @step:compare,found
            return current_index  # @step:found

    return -1  # @step:complete
