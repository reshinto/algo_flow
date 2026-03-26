def binary_search(sorted_array: list[int], target_value: int) -> int:
    low_index = 0
    high_index = len(sorted_array) - 1

    while low_index <= high_index:
        mid_index = (low_index + high_index) // 2
        mid_value = sorted_array[mid_index]

        if mid_value == target_value:
            return mid_index
        elif mid_value < target_value:
            low_index = mid_index + 1
        else:
            high_index = mid_index - 1

    return -1
