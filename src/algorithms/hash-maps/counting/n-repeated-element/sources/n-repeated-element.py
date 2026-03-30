# N-Repeated Element — find the element repeated n times in an array of size 2n
def n_repeated_element(numbers):
    frequency_map = {}  # @step:initialize
    target_count = len(numbers) // 2
    for element_index in range(len(numbers)):
        current_num = numbers[element_index]
        updated_count = frequency_map.get(current_num, 0) + 1  # @step:increment-count
        frequency_map[current_num] = updated_count
        if updated_count == target_count:
            return current_num  # @step:key-found
    return -1  # @step:complete
