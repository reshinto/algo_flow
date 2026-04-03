def bucket_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    if len(input_array) == 0:  # @step:initialize
        return []  # @step:initialize
    working_array = input_array.copy()  # @step:initialize
    array_length = len(working_array)  # @step:initialize

    min_value = min(working_array)  # @step:initialize
    max_value = max(working_array)  # @step:initialize
    bucket_count = max(1, array_length)  # @step:initialize
    value_range = max_value - min_value + 1  # @step:initialize

    # Create empty buckets
    buckets: list[list[int]] = [[] for _ in range(bucket_count)]  # @step:initialize

    # Distribute elements into buckets based on their normalized position
    for distribute_index in range(array_length):  # @step:distribute
        normalized_position = working_array[distribute_index] - min_value  # @step:distribute
        bucket_index = min(
            int(normalized_position / value_range * bucket_count),
            bucket_count - 1,
        )  # @step:distribute
        buckets[bucket_index].append(working_array[distribute_index])  # @step:distribute

    # Sort each bucket using insertion sort
    for bucket_index in range(bucket_count):  # @step:compare
        bucket = buckets[bucket_index]  # @step:compare
        for outer_index in range(1, len(bucket)):  # @step:compare
            current_value = bucket[outer_index]  # @step:compare
            insert_position = outer_index - 1  # @step:compare
            while insert_position >= 0 and bucket[insert_position] > current_value:  # @step:swap
                bucket[insert_position + 1] = bucket[insert_position]  # @step:swap
                insert_position -= 1  # @step:swap
            bucket[insert_position + 1] = current_value  # @step:swap

    # Collect all elements from sorted buckets
    write_index = 0  # @step:collect
    for bucket_index in range(bucket_count):  # @step:collect
        for bucket_value in buckets[bucket_index]:  # @step:collect
            working_array[write_index] = bucket_value  # @step:collect
            write_index += 1  # @step:collect

    # @step:mark-sorted
    return working_array  # @step:complete
