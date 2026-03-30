# Subarray Sum Equals K — count subarrays whose elements sum to the target using prefix sums and a hash map
def subarray_sum_equals_k(numbers, target):
    prefix_counts = {0: 1}  # @step:initialize
    current_sum = 0
    total_count = 0
    for element_index in range(len(numbers)):
        current_sum += numbers[element_index]  # @step:check-prefix
        needed = current_sum - target  # @step:check-prefix
        if needed in prefix_counts:  # @step:prefix-found
            total_count += prefix_counts[needed]  # @step:prefix-found
        # Store the running prefix sum count for future lookups
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1  # @step:increment-count
    return total_count  # @step:complete
