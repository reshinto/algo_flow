def american_flag_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:
        return sorted_array  # @step:complete

    min_value = min(sorted_array)  # @step:initialize
    offset = -min_value if min_value < 0 else 0  # @step:initialize
    for shift_index in range(array_length):  # @step:initialize
        sorted_array[shift_index] += offset  # @step:initialize

    max_value = max(sorted_array)  # @step:initialize
    digit_base = 10  # @step:initialize
    digit_divisor = 1  # @step:initialize
    while max_value // digit_divisor >= digit_base:
        digit_divisor *= digit_base  # @step:initialize

    _american_flag_pass(sorted_array, 0, array_length, digit_divisor, digit_base)

    for unshift_index in range(array_length):  # @step:mark-sorted
        sorted_array[unshift_index] -= offset  # @step:mark-sorted

    return sorted_array  # @step:complete


def _american_flag_pass(arr: list[int], start: int, end: int, divisor: int, base: int) -> None:
    if end - start <= 1 or divisor < 1:
        return

    # Count digit frequencies
    counts = [0] * base  # @step:count
    for count_index in range(start, end):  # @step:extract-digit
        digit = (arr[count_index] // divisor) % base  # @step:extract-digit
        counts[digit] += 1  # @step:count

    # Compute bucket offsets (prefix sums)
    offsets = [0] * base  # @step:count
    offsets[0] = start  # @step:count
    for offset_index in range(1, base):  # @step:count
        offsets[offset_index] = offsets[offset_index - 1] + counts[offset_index - 1]  # @step:count

    boundaries = list(offsets)  # @step:count

    # Permute elements in-place into correct buckets
    for bucket_digit in range(base):  # @step:swap
        bucket_end = boundaries[bucket_digit] + counts[bucket_digit]  # @step:swap
        while offsets[bucket_digit] < bucket_end:  # @step:swap
            current_pos = offsets[bucket_digit]  # @step:swap
            digit = (arr[current_pos] // divisor) % base  # @step:extract-digit
            if digit == bucket_digit:
                offsets[bucket_digit] += 1  # @step:swap
            else:
                swap_target = offsets[digit]  # @step:swap
                arr[current_pos], arr[swap_target] = arr[swap_target], arr[current_pos]  # @step:swap
                offsets[digit] += 1  # @step:swap

    # Recursively sort each bucket by the next digit
    if divisor > 1:
        next_divisor = divisor // base  # @step:mark-sorted
        for recursive_digit in range(base):  # @step:mark-sorted
            if counts[recursive_digit] > 1:
                _american_flag_pass(
                    arr,
                    boundaries[recursive_digit],
                    boundaries[recursive_digit] + counts[recursive_digit],
                    next_divisor,
                    base,
                )  # @step:mark-sorted
