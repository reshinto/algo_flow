def circle_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    # Repeat full passes until no swaps occur
    swapped = True
    while swapped:
        swapped = _circle_sort_pass(sorted_array, 0, array_length - 1)

    return sorted_array  # @step:complete


def _circle_sort_pass(sorted_array: list[int], left_index: int, right_index: int) -> bool:
    if left_index >= right_index:
        return False

    swapped = False
    low = left_index
    high = right_index

    while low < high:
        # @step:compare
        if sorted_array[low] > sorted_array[high]:  # @step:compare
            # @step:swap
            temporary_value = sorted_array[low]  # @step:swap
            sorted_array[low] = sorted_array[high]  # @step:swap
            sorted_array[high] = temporary_value  # @step:swap
            swapped = True
        low += 1
        high -= 1

    # If the midpoint element is reached (odd-length segment), compare it with one above
    if low == high:
        if sorted_array[low] > sorted_array[high + 1]:  # @step:compare
            # @step:swap
            temporary_value = sorted_array[low]  # @step:swap
            sorted_array[low] = sorted_array[high + 1]  # @step:swap
            sorted_array[high + 1] = temporary_value  # @step:swap
            swapped = True

    midpoint = (left_index + right_index) // 2
    left_swapped = _circle_sort_pass(sorted_array, left_index, midpoint)
    right_swapped = _circle_sort_pass(sorted_array, midpoint + 1, right_index)

    return swapped or left_swapped or right_swapped
