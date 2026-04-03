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
        search_left = 0  # @step:find-position
        search_right = gapped_size - 1  # @step:find-position
        insert_position = center_position  # @step:find-position

        while search_left <= search_right:
            mid_position = (search_left + search_right) // 2  # @step:compare
            mid_value = gapped_array[mid_position]  # @step:compare
            if mid_value is None:  # @step:compare
                left_scan = mid_position - 1  # @step:compare
                while left_scan >= search_left and gapped_array[left_scan] is None:  # @step:compare
                    left_scan -= 1  # @step:compare
                if left_scan < search_left or gapped_array[left_scan] is None:  # @step:compare
                    search_left = mid_position + 1  # @step:compare
                elif current_element <= gapped_array[left_scan]:  # @step:compare
                    search_right = left_scan  # @step:compare
                    insert_position = left_scan  # @step:compare
                else:
                    search_left = mid_position + 1  # @step:compare
                    insert_position = mid_position  # @step:compare
            elif current_element < mid_value:  # @step:compare
                search_right = mid_position - 1  # @step:compare
                insert_position = mid_position  # @step:compare
            else:
                search_left = mid_position + 1  # @step:compare
                insert_position = mid_position  # @step:compare

        # Find a gap near the insertion position and insert
        gap_position = insert_position  # @step:swap
        right_search = insert_position  # @step:swap
        while right_search < gapped_size and gapped_array[right_search] is not None:  # @step:swap
            right_search += 1  # @step:swap

        if right_search < gapped_size:  # @step:swap
            for shift_pos in range(right_search, insert_position, -1):  # @step:swap
                gapped_array[shift_pos] = gapped_array[shift_pos - 1]  # @step:swap
            gap_position = insert_position  # @step:swap
        else:
            left_search = insert_position  # @step:swap
            while left_search >= 0 and gapped_array[left_search] is not None:  # @step:swap
                left_search -= 1  # @step:swap
            for shift_pos in range(left_search, insert_position):  # @step:swap
                gapped_array[shift_pos] = gapped_array[shift_pos + 1]  # @step:swap
            gap_position = insert_position - 1  # @step:swap
        gapped_array[gap_position] = current_element  # @step:swap
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
