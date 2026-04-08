// Library Sort (Gapped Insertion Sort) — insert into a gapped array, rebalance when gaps fill
fn library_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let array_length = input_array.len(); // @step:initialize
    if array_length <= 1 {
        return input_array.to_vec(); // @step:initialize
    }

    // Use a gap factor: allocate extra space for gaps between elements
    let gap_factor = 2usize;
    let gapped_size = array_length * gap_factor + 1; // @step:initialize
    let mut gapped_array: Vec<Option<i64>> = vec![None; gapped_size]; // @step:initialize
    let mut filled_count = 0usize; // @step:initialize

    // Place the first element at the center of the gapped array
    let center_position = gapped_size / 2; // @step:initialize
    gapped_array[center_position] = Some(input_array[0]); // @step:initialize
    filled_count = 1; // @step:initialize

    for outer_index in 1..array_length {
        let current_element = input_array[outer_index]; // @step:find-position

        // Collect sorted filled values to binary search among them
        let mut filled_values: Vec<i64> = Vec::new(); // @step:find-position
        let mut filled_positions: Vec<usize> = Vec::new(); // @step:find-position
        for scan_index in 0..gapped_size {
            // @step:find-position
            if let Some(val) = gapped_array[scan_index] {
                filled_values.push(val); // @step:find-position
                filled_positions.push(scan_index); // @step:find-position
            }
        }

        // Binary search in filled values to find insertion rank
        let mut search_left = 0usize; // @step:compare
        let mut search_right = filled_values.len(); // @step:compare
        let mut insert_rank = filled_values.len(); // @step:compare

        while search_left < search_right {
            // @step:compare
            let mid_rank = search_left + (search_right - search_left) / 2; // @step:compare
            if current_element < filled_values[mid_rank] {
                // @step:compare
                insert_rank = mid_rank; // @step:compare
                search_right = mid_rank; // @step:compare
            } else {
                search_left = mid_rank + 1; // @step:compare
            }
        }

        // Determine insertion position in the gapped array
        let mut insert_position: usize; // @step:swap
        if insert_rank == 0 {
            // @step:swap
            insert_position = filled_positions[0]; // @step:swap
        } else if insert_rank >= filled_positions.len() {
            insert_position = filled_positions[filled_positions.len() - 1] + 1; // @step:swap
        } else {
            // Insert between rank-1 and rank — pick the position after the rank-1 element
            insert_position = filled_positions[insert_rank - 1] + 1; // @step:swap
        }

        // Clamp to valid range
        if insert_position >= gapped_size {
            insert_position = gapped_size - 1; // @step:swap
        }

        // Find a gap near the insertion position and insert
        // Search right for a None gap
        let mut right_search = insert_position; // @step:swap
        while right_search < gapped_size && gapped_array[right_search].is_some() {
            right_search += 1; // @step:swap
        }

        if right_search < gapped_size {
            // Shift elements right to open the gap at insert_position
            for shift_pos in (insert_position + 1..=right_search).rev() {
                // @step:swap
                gapped_array[shift_pos] = gapped_array[shift_pos - 1]; // @step:swap
            }
            gapped_array[insert_position] = Some(current_element); // @step:swap
        } else {
            // No gap to the right — search left
            let mut left_search = insert_position as isize - 1; // @step:swap
            while left_search >= 0 && gapped_array[left_search as usize].is_some() {
                left_search -= 1; // @step:swap
            }
            if left_search >= 0 {
                let left_idx = left_search as usize;
                for shift_pos in left_idx..insert_position - 1 {
                    // @step:swap
                    gapped_array[shift_pos] = gapped_array[shift_pos + 1]; // @step:swap
                }
                gapped_array[insert_position - 1] = Some(current_element); // @step:swap
            }
        }
        filled_count += 1; // @step:swap

        // Rebalance (redistribute with gaps) if the array is more than half full
        if filled_count >= gapped_size / 2 {
            // @step:rebalance
            let filled: Vec<i64> = gapped_array.iter().filter_map(|&val| val).collect(); // @step:rebalance
            gapped_array.fill(None); // @step:rebalance
            let spacing = gapped_size / (filled.len() + 1); // @step:rebalance
            for rebalance_index in 0..filled.len() {
                // @step:rebalance
                gapped_array[(rebalance_index + 1) * spacing] = Some(filled[rebalance_index]); // @step:rebalance
            }
        }

        // @step:mark-sorted
    }

    // Collect the result in order, filtering out Nones
    let result_array: Vec<i64> = gapped_array.into_iter().flatten().collect(); // @step:complete
    result_array // @step:complete
}
