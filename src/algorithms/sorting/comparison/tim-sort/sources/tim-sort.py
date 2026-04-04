MIN_RUN_SIZE = 4


def insertion_sort_run(sorted_array: list[int], run_start: int, run_end: int) -> None:  # @step:insertion-pass
    for outer_index in range(run_start + 1, run_end + 1):  # @step:insertion-pass
        current_value = sorted_array[outer_index]  # @step:insertion-pass
        inner_index = outer_index - 1  # @step:insertion-pass

        while inner_index >= run_start and sorted_array[inner_index] > current_value:  # @step:compare
            sorted_array[inner_index + 1] = sorted_array[inner_index]  # @step:swap
            inner_index -= 1  # @step:swap
        sorted_array[inner_index + 1] = current_value  # @step:swap


def merge_runs(sorted_array: list[int], left_start: int, mid_point: int, right_end: int) -> None:  # @step:merge
    left_slice = sorted_array[left_start : mid_point + 1]  # @step:merge
    right_slice = sorted_array[mid_point + 1 : right_end + 1]  # @step:merge

    left_pointer = 0  # @step:merge
    right_pointer = 0  # @step:merge
    merge_index = left_start  # @step:merge

    while left_pointer < len(left_slice) and right_pointer < len(right_slice):  # @step:compare
        if left_slice[left_pointer] <= right_slice[right_pointer]:  # @step:compare
            sorted_array[merge_index] = left_slice[left_pointer]  # @step:merge
            left_pointer += 1  # @step:merge
        else:
            sorted_array[merge_index] = right_slice[right_pointer]  # @step:merge
            right_pointer += 1  # @step:merge
        merge_index += 1  # @step:merge

    while left_pointer < len(left_slice):
        sorted_array[merge_index] = left_slice[left_pointer]  # @step:merge
        left_pointer += 1  # @step:merge
        merge_index += 1  # @step:merge

    while right_pointer < len(right_slice):
        sorted_array[merge_index] = right_slice[right_pointer]  # @step:merge
        right_pointer += 1  # @step:merge
        merge_index += 1  # @step:merge


def tim_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    # Sort individual runs using insertion sort
    run_start = 0  # @step:insertion-pass
    while run_start < array_length:  # @step:insertion-pass
        run_end = min(run_start + MIN_RUN_SIZE - 1, array_length - 1)  # @step:insertion-pass
        insertion_sort_run(sorted_array, run_start, run_end)  # @step:insertion-pass
        run_start += MIN_RUN_SIZE  # @step:insertion-pass

    # Merge sorted runs in increasing size
    merge_size = MIN_RUN_SIZE  # @step:merge
    while merge_size < array_length:  # @step:merge
        left_start = 0  # @step:merge
        while left_start < array_length:  # @step:merge
            mid_point = min(left_start + merge_size - 1, array_length - 1)  # @step:merge
            right_end = min(left_start + 2 * merge_size - 1, array_length - 1)  # @step:merge

            if mid_point < right_end:  # @step:merge
                merge_runs(sorted_array, left_start, mid_point, right_end)  # @step:merge
            left_start += 2 * merge_size  # @step:merge
        merge_size *= 2  # @step:merge

    # @step:mark-sorted
    return sorted_array  # @step:complete
