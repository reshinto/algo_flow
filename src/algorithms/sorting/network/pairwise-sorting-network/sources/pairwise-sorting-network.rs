// Pairwise Sorting Network — sort adjacent pairs first, then merge via compare-swap with doubling strides
fn pairwise_sorting_network(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:complete
    }

    // Compare-and-swap: ensure sorted_array[a] <= sorted_array[b]
    let compare_and_swap = |arr: &mut Vec<i64>, first_index: usize, second_index: usize| {
        if first_index < arr.len() && second_index < arr.len() {
            if arr[first_index] > arr[second_index] {
                // @step:swap
                arr.swap(first_index, second_index); // @step:swap
            }
        }
    };

    // Phase 1: Sort adjacent pairs
    let mut pair_start = 0;
    while pair_start + 1 < array_length {
        // @step:compare
        compare_and_swap(&mut sorted_array, pair_start, pair_start + 1); // @step:compare
        pair_start += 2;
    }

    // Phase 2: Merge using Shell-sort-like gap sequence (powers of 2, decreasing)
    let mut gap = 2usize;
    while gap < array_length {
        // @step:compare
        // Compare elements at distance gap within each merged block
        let mut block_start = 0;
        while block_start < array_length {
            // @step:compare
            let mut offset = 0;
            while offset < gap && block_start + offset + gap < array_length {
                // @step:compare
                compare_and_swap(&mut sorted_array, block_start + offset, block_start + offset + gap); // @step:compare
                offset += 1;
            }
            block_start += gap * 2;
        }
        // Reconciliation: fix local inversions created by the block merge
        let mut reconcile_gap = gap / 2;
        while reconcile_gap >= 1 {
            // @step:compare
            let mut reconcile_start = reconcile_gap;
            while reconcile_start + reconcile_gap < array_length {
                // @step:compare
                let mut reconcile_offset = 0;
                while reconcile_offset < reconcile_gap
                    && reconcile_start + reconcile_offset < array_length - 1
                {
                    // @step:compare
                    compare_and_swap(
                        &mut sorted_array,
                        reconcile_start + reconcile_offset,
                        reconcile_start + reconcile_offset + 1,
                    ); // @step:compare
                    reconcile_offset += 1;
                }
                reconcile_start += reconcile_gap * 2;
            }
            reconcile_gap /= 2;
        }
        gap *= 2;
    }

    // Final pass to ensure complete sortedness (odd-even transposition pass)
    let mut swapped = true;
    while swapped {
        swapped = false;
        for final_index in 0..array_length.saturating_sub(1) {
            if sorted_array[final_index] > sorted_array[final_index + 1] {
                compare_and_swap(&mut sorted_array, final_index, final_index + 1);
                swapped = true;
            }
        }
    }

    // @step:mark-sorted

    sorted_array // @step:complete
}
