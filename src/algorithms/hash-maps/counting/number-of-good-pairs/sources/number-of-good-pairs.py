# Number of Good Pairs — count pairs (i, j) where nums[i] === nums[j] and i < j
def number_of_good_pairs(numbers):
    frequency_map = {}  # @step:initialize
    total_pairs = 0
    for element_index in range(len(numbers)):
        current_num = numbers[element_index]
        current_count = frequency_map.get(current_num, 0)
        total_pairs += current_count  # @step:key-found
        frequency_map[current_num] = current_count + 1  # @step:increment-count
    return total_pairs  # @step:complete
