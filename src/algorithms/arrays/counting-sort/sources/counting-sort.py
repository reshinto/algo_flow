# Counting Sort — O(n+k) sort by counting frequencies and reconstructing sorted order
def counting_sort(input_array: list[int]) -> list[int]:
    if len(input_array) == 0:  # @step:initialize
        return []  # @step:initialize

    max_value = max(input_array)  # @step:initialize
    count_array = [0] * (max_value + 1)  # @step:initialize

    # Count the frequency of each element
    for scan_index in range(len(input_array)):
        count_array[input_array[scan_index]] += 1  # @step:visit

    # Reconstruct the sorted array from count frequencies
    sorted_array = []  # @step:compare
    for current_value in range(max_value + 1):
        for repeat_index in range(count_array[current_value]):
            sorted_array.append(current_value)  # @step:compare

    return sorted_array  # @step:complete
