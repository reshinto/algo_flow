def radix_sort_lsd(input_array: list[int]) -> list[int]:  # @step:initialize
    if len(input_array) == 0:  # @step:initialize
        return []  # @step:initialize
    working_array = input_array.copy()  # @step:initialize
    array_length = len(working_array)  # @step:initialize

    # Offset negatives so all values are non-negative
    min_value = min(working_array)  # @step:initialize
    offset = -min_value if min_value < 0 else 0  # @step:initialize
    working_array = [value + offset for value in working_array]  # @step:initialize
    max_value = max(working_array)  # @step:initialize

    # Process each digit position from least significant to most significant
    digit_divisor = 1  # @step:initialize
    while max_value // digit_divisor > 0:  # @step:extract-digit
        base = 10  # @step:extract-digit
        buckets: list[list[int]] = [[] for _ in range(base)]  # @step:extract-digit

        # Distribute elements into buckets based on current digit
        for distribute_index in range(array_length):  # @step:extract-digit
            digit = (working_array[distribute_index] // digit_divisor) % base  # @step:extract-digit
            buckets[digit].append(working_array[distribute_index])  # @step:extract-digit

        # Collect elements back from buckets in order
        write_index = 0  # @step:place
        for bucket_index in range(base):  # @step:place
            for bucket_value in buckets[bucket_index]:  # @step:place
                working_array[write_index] = bucket_value  # @step:place
                write_index += 1  # @step:place

        digit_divisor *= base  # @step:place

    # Reverse the offset to restore original value range
    for restore_index in range(array_length):  # @step:mark-sorted
        working_array[restore_index] -= offset  # @step:mark-sorted

    return working_array  # @step:complete
