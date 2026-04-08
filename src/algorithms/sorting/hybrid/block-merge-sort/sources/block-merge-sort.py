def block_merge_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize
    if array_length <= 1:  # @step:initialize
        return sorted_array  # @step:initialize

    # Find natural ascending runs in the array
    # @step:find-runs
    run_boundaries: list[int] = [0]  # @step:find-runs
    for scan_index in range(1, array_length):  # @step:compare
        if sorted_array[scan_index] < sorted_array[scan_index - 1]:  # @step:compare
            run_boundaries.append(scan_index)  # @step:find-runs
    run_boundaries.append(array_length)  # @step:find-runs

    # Merge runs pairwise until one run covers the full array
    while len(run_boundaries) > 2:
        next_boundaries: list[int] = [0]  # @step:merge

        boundary_index = 0
        while boundary_index + 2 <= len(run_boundaries) - 1:
            left_start = run_boundaries[boundary_index]  # @step:merge
            right_start = run_boundaries[boundary_index + 1]  # @step:merge
            merge_end = run_boundaries[boundary_index + 2]  # @step:merge

            # In-place merge using rotation
            left_pointer = left_start  # @step:compare
            right_pointer = right_start  # @step:compare

            while left_pointer < right_pointer < merge_end:  # @step:compare
                if sorted_array[left_pointer] <= sorted_array[right_pointer]:  # @step:compare
                    left_pointer += 1  # @step:compare
                else:
                    # Rotate the element from right_pointer into the correct position
                    displaced_value = sorted_array[right_pointer]  # @step:rotate
                    for shift_index in range(right_pointer, left_pointer, -1):  # @step:swap
                        sorted_array[shift_index] = sorted_array[shift_index - 1]  # @step:swap
                    sorted_array[left_pointer] = displaced_value  # @step:swap
                    left_pointer += 1  # @step:swap
                    right_pointer += 1  # @step:swap

            next_boundaries.append(merge_end)  # @step:merge
            boundary_index += 2

        # If there is an odd run left, carry its end boundary over unchanged
        if (len(run_boundaries) - 1) % 2 == 1:
            next_boundaries.append(array_length)  # @step:merge

        run_boundaries = list(next_boundaries)  # @step:merge

        # @step:mark-sorted

    return sorted_array  # @step:complete
