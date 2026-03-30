# Majority Element — find the element that appears more than n/2 times using a frequency map
def majority_element(numbers):
    frequency_map = {}  # @step:initialize
    threshold = len(numbers) // 2  # @step:initialize
    for current_num in numbers:
        updated_count = frequency_map.get(current_num, 0) + 1  # @step:increment-count
        frequency_map[current_num] = updated_count  # @step:increment-count
        if updated_count > threshold:  # @step:key-found
            return current_num
    return -1  # @step:complete
