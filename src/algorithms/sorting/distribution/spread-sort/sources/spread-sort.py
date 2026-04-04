import math


def spread_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:
        return sorted_array  # @step:complete

    min_value = min(sorted_array)  # @step:initialize
    max_value = max(sorted_array)  # @step:initialize

    if min_value == max_value:
        return sorted_array  # @step:complete

    bin_count = max(2, math.ceil(math.sqrt(array_length)))  # @step:initialize
    bins: list[list[int]] = [[] for _ in range(bin_count)]  # @step:initialize
    value_range = max_value - min_value + 1  # @step:initialize

    # Distribute elements into bins based on value
    for distribute_index in range(array_length):  # @step:distribute
        normalized_offset = sorted_array[distribute_index] - min_value  # @step:distribute
        bin_index = min(math.floor((normalized_offset / value_range) * bin_count), bin_count - 1)  # @step:distribute
        bins[bin_index].append(sorted_array[distribute_index])  # @step:distribute

    # Process each bin — insertion sort for small bins
    write_index = 0  # @step:compare
    for bin_index in range(bin_count):  # @step:compare
        current_bin = bins[bin_index]  # @step:compare
        if not current_bin:
            continue  # @step:compare

        # Insertion sort within the bin
        for outer_index in range(1, len(current_bin)):  # @step:compare
            current_value = current_bin[outer_index]  # @step:compare
            insert_position = outer_index - 1  # @step:compare
            while insert_position >= 0 and current_bin[insert_position] > current_value:  # @step:compare
                current_bin[insert_position + 1] = current_bin[insert_position]  # @step:swap
                insert_position -= 1  # @step:swap
            current_bin[insert_position + 1] = current_value  # @step:swap

        # Write sorted bin back to the main array
        for bin_value in current_bin:  # @step:mark-sorted
            sorted_array[write_index] = bin_value  # @step:mark-sorted
            write_index += 1  # @step:mark-sorted

    return sorted_array  # @step:complete
