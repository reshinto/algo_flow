import math

def jump_search(sorted_array: list[int], target_value: int) -> int:  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    if array_length == 0:  # @step:initialize
        return -1  # @step:initialize

    block_size = int(math.sqrt(array_length))  # @step:initialize
    block_start = 0  # @step:initialize
    jump_end = block_size  # @step:initialize

    while jump_end < array_length and sorted_array[jump_end - 1] < target_value:
        # @step:visit
        block_start = jump_end  # @step:visit
        jump_end += block_size  # @step:visit

    # Linear scan within the identified block
    scan_end = min(jump_end, array_length)  # @step:compare
    for current_index in range(block_start, scan_end):  # @step:compare
        if sorted_array[current_index] == target_value:  # @step:compare,found
            return current_index  # @step:found

    return -1  # @step:complete
