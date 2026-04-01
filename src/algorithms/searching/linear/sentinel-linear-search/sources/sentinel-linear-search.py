def sentinel_linear_search(array: list[int], target_value: int) -> int:  # @step:initialize
    array_length = len(array)  # @step:initialize
    if array_length == 0:  # @step:initialize
        return -1

    last_element = array[array_length - 1]  # @step:initialize
    array[array_length - 1] = target_value  # @step:initialize -- place sentinel

    current_index = 0  # @step:initialize

    while array[current_index] != target_value:  # @step:visit
        current_index += 1  # @step:visit

    array[array_length - 1] = last_element  # @step:compare -- restore last element

    if current_index < array_length - 1 or last_element == target_value:  # @step:compare,found
        return current_index  # @step:found

    return -1  # @step:complete
