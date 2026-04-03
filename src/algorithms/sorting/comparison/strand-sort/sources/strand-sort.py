def strand_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    remaining_array = input_array.copy()  # @step:initialize
    array_length = len(remaining_array)  # @step:initialize

    if array_length <= 1:  # @step:initialize
        return remaining_array[:]  # @step:initialize

    output_array: list[int] = []  # @step:initialize

    while remaining_array:
        # Extract a strand: pick elements forming an ascending sequence
        strand: list[int] = [remaining_array[0]]  # @step:extract-strand
        leftover: list[int] = []  # @step:extract-strand

        for scan_index in range(1, len(remaining_array)):  # @step:compare
            if remaining_array[scan_index] >= strand[-1]:  # @step:compare
                strand.append(remaining_array[scan_index])  # @step:extract-strand
            else:
                leftover.append(remaining_array[scan_index])  # @step:extract-strand

        # Merge the strand into the output
        output_array = merge_two_sorted_arrays(output_array, strand)  # @step:merge-strand

        remaining_array = leftover  # @step:extract-strand

    # @step:mark-sorted

    return output_array  # @step:complete


def merge_two_sorted_arrays(left_array: list[int], right_array: list[int]) -> list[int]:
    merged: list[int] = []
    left_pointer = 0
    right_pointer = 0

    while left_pointer < len(left_array) and right_pointer < len(right_array):
        if left_array[left_pointer] <= right_array[right_pointer]:
            merged.append(left_array[left_pointer])
            left_pointer += 1
        else:
            merged.append(right_array[right_pointer])
            right_pointer += 1

    merged.extend(left_array[left_pointer:])
    merged.extend(right_array[right_pointer:])
    return merged
