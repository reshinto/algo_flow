# Find All Duplicates — O(n) time, O(1) space via sign-negation index marking
def find_all_duplicates(input_array: list[int]) -> list[int]:
    result = input_array[:]  # @step:initialize
    duplicates = []  # @step:initialize

    # Mark visited positions by negating the value at the mapped index
    for scan_index in range(len(result)):
        mapped_index = abs(result[scan_index]) - 1  # @step:compare

        if result[mapped_index] < 0:
            # Already negative means we visited this index before — duplicate found
            duplicates.append(abs(result[scan_index]))  # @step:compare
        else:
            result[mapped_index] = -result[mapped_index]  # @step:swap

    return duplicates  # @step:complete
