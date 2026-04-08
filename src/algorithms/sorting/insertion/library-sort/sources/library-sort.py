def library_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    array_length = len(input_array)  # @step:initialize
    if array_length <= 1:  # @step:initialize
        return list(input_array)  # @step:initialize

    # Use a gap factor: allocate extra space for gaps between elements
    gap_factor = 2  # @step:initialize
    gapped_size = array_length * gap_factor + 1  # @step:initialize
    gapped_array: list[int | None] = [None] * gapped_size  # @step:initialize
    filled_count = 0  # @step:initialize

    # Place the first element at the center of the gapped array
    center_position = gapped_size // 2  # @step:initialize
    gapped_array[center_position] = input_array[0]  # @step:initialize
    filled_count = 1  # @step:initialize

    for outer_index in range(1, array_length):
        current_element = input_array[outer_index]  # @step:find-position

        # Collect sorted filled values to binary search among them
        filled_values: list[int] = []  # @step:find-position
        filled_positions: list[int] = []  # @step:find-position
        for scan_index in range(gapped_size):  # @step:find-position
            if gapped_array[scan_index] is not None:
                filled_values.append(gapped_array[scan_index])  # @step:find-position
                filled_positions.append(scan_index)  # @step:find-position

        # Binary search in filled values to find insertion rank
        search_left = 0  # @step:compare
        search_right = len(filled_values) - 1  # @step:compare
        insert_rank = len(filled_values)  # @step:compare

        while search_left <= search_right:  # @step:compare
            mid_rank = (search_left + search_right) // 2  # @step:compare
            if current_element < filled_values[mid_rank]:  # @step:compare
                insert_rank = mid_rank  # @step:compare
                search_right = mid_rank - 1  # @step:compare
            else:
                search_left = mid_rank + 1  # @step:compare

        # Determine insertion position in the gapped array
        if insert_rank == 0:  # @step:swap
            insert_position = filled_positions[0]  # @step:swap
        elif insert_rank >= len(filled_positions):
            insert_position = filled_positions[-1] + 1  # @step:swap
        else:
            insert_position = filled_positions[insert_rank - 1] + 1  # @step:swap

        # Clamp to valid range
        if insert_position >= gapped_size:  # @step:swap
            insert_position = gapped_size - 1  # @step:swap

        # Find a gap near the insertion position and insert
        right_search = insert_position  # @step:swap
        while right_search < gapped_size and gapped_array[right_search] is not None:  # @step:swap
            right_search += 1  # @step:swap

        if right_search < gapped_size:  # @step:swap
            for shift_pos in range(right_search, insert_position, -1):  # @step:swap
                gapped_array[shift_pos] = gapped_array[shift_pos - 1]  # @step:swap
            gapped_array[insert_position] = current_element  # @step:swap
        else:
            left_search = insert_position - 1  # @step:swap
            while left_search >= 0 and gapped_array[left_search] is not None:  # @step:swap
                left_search -= 1  # @step:swap
            if left_search >= 0:
                for shift_pos in range(left_search, insert_position - 1):  # @step:swap
                    gapped_array[shift_pos] = gapped_array[shift_pos + 1]  # @step:swap
                gapped_array[insert_position - 1] = current_element  # @step:swap
        filled_count += 1  # @step:swap

        # Rebalance if the array is more than half full
        if filled_count >= gapped_size // 2:  # @step:rebalance
            filled = [val for val in gapped_array if val is not None]  # @step:rebalance
            gapped_array = [None] * gapped_size  # @step:rebalance
            spacing = gapped_size // (len(filled) + 1)  # @step:rebalance
            for rebalance_index, value in enumerate(filled):  # @step:rebalance
                gapped_array[(rebalance_index + 1) * spacing] = value  # @step:rebalance

        # @step:mark-sorted

    # Collect the result in order, filtering out nulls
    return [val for val in gapped_array if val is not None]  # @step:complete
