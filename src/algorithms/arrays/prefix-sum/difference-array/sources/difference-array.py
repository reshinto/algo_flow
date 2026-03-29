# Difference Array — O(n + q) range updates via difference array and prefix sum reconstruction
def difference_array(array_length: int, updates: list[list[int]]) -> list[int]:
    diff_array = [0] * (array_length + 1)  # @step:initialize
    result = [0] * array_length  # @step:initialize

    # Apply each range update [left, right, delta] to the difference array
    for update_index in range(len(updates)):
        update = updates[update_index]
        left_bound = update[0]  # @step:visit
        right_bound = update[1]  # @step:visit
        delta = update[2]  # @step:visit
        diff_array[left_bound] += delta  # @step:compare
        if right_bound + 1 < len(diff_array):  # @step:compare
            diff_array[right_bound + 1] -= delta  # @step:compare

    # Reconstruct result via prefix sum of the difference array
    running_sum = 0  # @step:visit
    for scan_index in range(array_length):
        running_sum += diff_array[scan_index]  # @step:visit
        result[scan_index] = running_sum  # @step:visit

    return result  # @step:complete
