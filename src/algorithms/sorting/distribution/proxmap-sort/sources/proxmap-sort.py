def proxmap_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    source_array = input_array.copy()  # @step:initialize
    array_length = len(source_array)  # @step:initialize

    if array_length <= 1:
        return source_array  # @step:complete

    min_value = min(source_array)  # @step:initialize
    max_value = max(source_array)  # @step:initialize

    if min_value == max_value:
        return source_array  # @step:complete

    value_range = max_value - min_value  # @step:initialize
    scale_factor = (array_length - 1) / value_range  # @step:initialize

    # Build proxmap — count how many elements map to each position
    hit_count = [0] * array_length  # @step:map-position
    for map_index in range(array_length):  # @step:map-position
        mapped_position = int(scale_factor * (source_array[map_index] - min_value))  # @step:map-position
        hit_count[mapped_position] += 1  # @step:map-position

    # Compute starting positions for each cluster (prefix sums)
    start_position = [0] * array_length  # @step:map-position
    running_total = 0  # @step:map-position
    for pos_index in range(array_length):  # @step:map-position
        start_position[pos_index] = running_total  # @step:map-position
        running_total += hit_count[pos_index]  # @step:map-position

    # Insert each element into the output array near its mapped position
    output_array = [0] * array_length  # @step:compare
    next_slot = list(start_position)  # @step:compare

    for insert_index in range(array_length):  # @step:compare
        current_value = source_array[insert_index]  # @step:compare
        mapped_position = int(scale_factor * (current_value - min_value))  # @step:compare
        slot_index = next_slot[mapped_position]  # @step:compare

        # Insertion sort within the cluster to maintain order
        while slot_index > start_position[mapped_position] and output_array[slot_index - 1] > current_value:  # @step:compare
            output_array[slot_index] = output_array[slot_index - 1]  # @step:swap
            slot_index -= 1  # @step:swap
        output_array[slot_index] = current_value  # @step:swap
        next_slot[mapped_position] += 1  # @step:swap

    # Copy sorted output back to source array
    for copy_index in range(array_length):  # @step:mark-sorted
        source_array[copy_index] = output_array[copy_index]  # @step:mark-sorted

    return source_array  # @step:complete
