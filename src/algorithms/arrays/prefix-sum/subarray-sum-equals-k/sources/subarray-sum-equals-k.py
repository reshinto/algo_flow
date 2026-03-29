# Subarray Sum Equals K — O(n) via prefix sum + hash map
def subarray_sum_equals_k(input_array: list[int], target: int) -> dict:
    prefix_sum_map = {0: 1}  # @step:initialize
    running_sum = 0  # @step:initialize
    found_count = 0  # @step:initialize
    subarrays = []  # @step:initialize

    for scan_index in range(len(input_array)):
        running_sum += input_array[scan_index]  # @step:visit

        lookup_key = running_sum - target  # @step:compare

        if lookup_key in prefix_sum_map:  # @step:compare
            match_count = prefix_sum_map[lookup_key]
            found_count += match_count  # @step:compare
            subarrays.append([lookup_key, scan_index])  # @step:compare

        prefix_sum_map[running_sum] = prefix_sum_map.get(running_sum, 0) + 1  # @step:visit

    return {"count": found_count, "subarrays": subarrays}  # @step:complete
