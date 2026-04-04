def radix_sort_msd(input_array: list[int]) -> list[int]:  # @step:initialize
    if len(input_array) == 0:  # @step:initialize
        return []  # @step:initialize
    working_array = input_array.copy()  # @step:initialize
    array_length = len(working_array)  # @step:initialize

    # Offset negatives so all values are non-negative
    min_value = min(working_array)  # @step:initialize
    offset = -min_value if min_value < 0 else 0  # @step:initialize
    working_array = [value + offset for value in working_array]  # @step:initialize
    max_value = max(working_array)  # @step:initialize
    base = 10  # @step:initialize

    # Determine the highest digit position
    max_divisor = 1  # @step:initialize
    while max_divisor * base <= max_value:  # @step:initialize
        max_divisor *= base  # @step:initialize

    def sort_by_digit(sub_array: list[int], digit_divisor: int) -> list[int]:  # @step:extract-digit
        if len(sub_array) <= 1 or digit_divisor < 1:  # @step:extract-digit
            return sub_array  # @step:extract-digit

        buckets: list[list[int]] = [[] for _ in range(base)]  # @step:extract-digit

        for value in sub_array:  # @step:extract-digit
            digit = (value // digit_divisor) % base  # @step:extract-digit
            buckets[digit].append(value)  # @step:extract-digit

        result: list[int] = []  # @step:place
        for bucket_index in range(base):  # @step:place
            sorted_bucket = sort_by_digit(buckets[bucket_index], digit_divisor // base)  # @step:place
            result.extend(sorted_bucket)  # @step:place

        return result  # @step:place

    sorted_array = sort_by_digit(working_array, max_divisor)

    # Restore offset
    for restore_index in range(array_length):  # @step:mark-sorted
        sorted_array[restore_index] -= offset  # @step:mark-sorted

    return sorted_array  # @step:complete
