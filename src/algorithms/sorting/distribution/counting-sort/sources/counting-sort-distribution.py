def counting_sort_distribution(input_array: list[int]) -> list[int]:  # @step:initialize
    if len(input_array) == 0:  # @step:initialize
        return []  # @step:initialize
    working_array = input_array.copy()  # @step:initialize
    array_length = len(working_array)  # @step:initialize

    # Find the range of values
    min_value = min(working_array)  # @step:initialize
    max_value = max(working_array)  # @step:initialize
    value_range = max_value - min_value + 1  # @step:initialize
    count_array = [0] * value_range  # @step:initialize

    # Count occurrences of each value
    for count_index in range(array_length):  # @step:count
        bucket_position = working_array[count_index] - min_value  # @step:count
        count_array[bucket_position] += 1  # @step:count

    # Place elements back into the array in sorted order
    write_index = 0  # @step:place
    for value_index in range(value_range):  # @step:place
        while count_array[value_index] > 0:  # @step:place
            working_array[write_index] = value_index + min_value  # @step:place
            write_index += 1  # @step:place
            count_array[value_index] -= 1  # @step:place

    # @step:mark-sorted
    return working_array  # @step:complete
