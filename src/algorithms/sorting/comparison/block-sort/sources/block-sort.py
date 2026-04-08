def block_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:  # @step:initialize
        return sorted_array  # @step:initialize

    def reverse_segment(start_index: int, end_index: int) -> None:  # @step:rotate
        low = start_index
        high = end_index
        while low < high:  # @step:swap
            temporary_value = sorted_array[low]  # @step:swap
            sorted_array[low] = sorted_array[high]  # @step:swap
            sorted_array[high] = temporary_value  # @step:swap
            low += 1
            high -= 1

    def rotate_left(left_start: int, mid_point: int, right_end: int) -> None:  # @step:rotate
        reverse_segment(left_start, mid_point - 1)
        reverse_segment(mid_point, right_end)
        reverse_segment(left_start, right_end)

    def merge_in_place(run_start: int, run_mid: int, run_end: int) -> None:  # @step:merge
        if run_start >= run_mid or run_mid > run_end:  # @step:merge
            return

        left_pointer = run_start
        right_pointer = run_mid

        while left_pointer < right_pointer <= run_end:
            if sorted_array[left_pointer] <= sorted_array[right_pointer]:  # @step:compare
                left_pointer += 1
            else:
                insertion_point = right_pointer
                while insertion_point <= run_end and sorted_array[insertion_point] < sorted_array[left_pointer]:  # @step:compare
                    insertion_point += 1

                right_segment_length = insertion_point - right_pointer
                rotate_left(left_pointer, right_pointer, insertion_point - 1)  # @step:rotate

                left_pointer += right_segment_length
                right_pointer = insertion_point

    # Find natural sorted runs
    runs: list[tuple[int, int]] = []
    run_start = 0

    for scan_index in range(1, array_length):  # @step:find-runs
        if sorted_array[scan_index] < sorted_array[scan_index - 1]:  # @step:compare
            runs.append((run_start, scan_index - 1))  # @step:find-runs
            run_start = scan_index

    runs.append((run_start, array_length - 1))  # @step:find-runs

    # Merge adjacent runs until one run remains
    while len(runs) > 1:  # @step:merge
        merged_runs: list[tuple[int, int]] = []

        for run_index in range(0, len(runs), 2):
            if run_index + 1 < len(runs):
                left_run = runs[run_index]
                right_run = runs[run_index + 1]
                merge_in_place(left_run[0], right_run[0], right_run[1])  # @step:merge
                merged_runs.append((left_run[0], right_run[1]))
            else:
                merged_runs.append(runs[run_index])

        runs = merged_runs

    # @step:mark-sorted

    return sorted_array  # @step:complete
