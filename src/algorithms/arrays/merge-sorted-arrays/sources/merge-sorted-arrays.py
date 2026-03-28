# Merge Two Sorted Arrays — O(n+m) merge using two pointers
def merge_sorted_arrays(first_array: list[int], second_array: list[int]) -> list[int]:
    merged = []  # @step:initialize
    first_pointer = 0  # @step:initialize
    second_pointer = 0  # @step:initialize

    # Compare front elements from each array, place the smaller into result
    while first_pointer < len(first_array) and second_pointer < len(second_array):
        if first_array[first_pointer] <= second_array[second_pointer]:  # @step:compare
            merged.append(first_array[first_pointer])  # @step:visit
            first_pointer += 1  # @step:visit
        else:
            merged.append(second_array[second_pointer])  # @step:visit
            second_pointer += 1  # @step:visit

    # Drain remaining elements from whichever array has leftovers
    while first_pointer < len(first_array):
        merged.append(first_array[first_pointer])  # @step:visit
        first_pointer += 1  # @step:visit
    while second_pointer < len(second_array):
        merged.append(second_array[second_pointer])  # @step:visit
        second_pointer += 1  # @step:visit

    return merged  # @step:complete
