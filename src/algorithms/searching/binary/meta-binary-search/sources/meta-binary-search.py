import math

def meta_binary_search(sorted_array: list[int], target_value: int) -> int:  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    if array_length == 0:  # @step:initialize
        return -1  # @step:initialize

    bit_count = int(math.floor(math.log2(array_length)))  # @step:initialize
    position = 0  # @step:initialize

    for bit_index in range(bit_count, -1, -1):  # @step:compare
        new_position = position | (1 << bit_index)  # @step:compare

        if new_position < array_length and sorted_array[new_position] <= target_value:  # @step:compare,eliminate
            position = new_position  # @step:eliminate

    if sorted_array[position] == target_value:  # @step:compare,found
        return position  # @step:found

    return -1  # @step:complete
