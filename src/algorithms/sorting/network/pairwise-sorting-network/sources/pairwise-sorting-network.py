def pairwise_sorting_network(input_array: list[int]) -> list[int]:  # @step:initialize
    sorted_array = input_array.copy()  # @step:initialize
    array_length = len(sorted_array)  # @step:initialize

    if array_length <= 1:
        return sorted_array  # @step:complete

    def compare_and_swap(first_index: int, second_index: int) -> None:
        if first_index < array_length and second_index < array_length:
            if sorted_array[first_index] > sorted_array[second_index]:
                # @step:swap
                temporary_value = sorted_array[first_index]  # @step:swap
                sorted_array[first_index] = sorted_array[second_index]  # @step:swap
                sorted_array[second_index] = temporary_value  # @step:swap

    # Phase 1: Sort adjacent pairs
    pair_start = 0
    while pair_start + 1 < array_length:  # @step:compare
        compare_and_swap(pair_start, pair_start + 1)  # @step:compare
        pair_start += 2

    # Phase 2: Merge using Shell-sort-like gap sequence (powers of 2, decreasing)
    gap = 2
    while gap < array_length:  # @step:compare
        # Compare elements at distance gap within each merged block
        block_start = 0
        while block_start < array_length:  # @step:compare
            offset = 0
            while offset < gap and block_start + offset + gap < array_length:  # @step:compare
                compare_and_swap(block_start + offset, block_start + offset + gap)  # @step:compare
                offset += 1
            block_start += gap * 2

        # Reconciliation: fix local inversions created by the block merge
        reconcile_gap = gap // 2
        while reconcile_gap >= 1:  # @step:compare
            reconcile_start = reconcile_gap
            while reconcile_start + reconcile_gap < array_length:  # @step:compare
                reconcile_offset = 0
                while reconcile_offset < reconcile_gap and reconcile_start + reconcile_offset < array_length - 1:  # @step:compare
                    compare_and_swap(reconcile_start + reconcile_offset, reconcile_start + reconcile_offset + 1)  # @step:compare
                    reconcile_offset += 1
                reconcile_start += reconcile_gap * 2
            reconcile_gap = reconcile_gap // 2 if reconcile_gap > 1 else 0

        gap *= 2

    # Final pass: odd-even transposition to ensure complete sortedness
    swapped = True
    while swapped:
        swapped = False
        for final_index in range(array_length - 1):
            if sorted_array[final_index] > sorted_array[final_index + 1]:
                compare_and_swap(final_index, final_index + 1)
                swapped = True

    # @step:mark-sorted

    return sorted_array  # @step:complete
