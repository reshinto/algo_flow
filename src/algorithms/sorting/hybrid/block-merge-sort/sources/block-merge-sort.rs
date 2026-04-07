// Block Merge Sort (simplified GrailSort) — find natural runs, merge in-place via rotation
fn block_merge_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    if array_length <= 1 {
        return sorted_array; // @step:initialize
    }

    // Find natural ascending runs in the array
    // @step:find-runs
    let mut run_boundaries: Vec<usize> = vec![0]; // @step:find-runs
    for scan_index in 1..array_length {
        // @step:compare
        if sorted_array[scan_index] < sorted_array[scan_index - 1] {
            // @step:compare
            run_boundaries.push(scan_index); // @step:find-runs
        }
    }
    run_boundaries.push(array_length); // @step:find-runs

    // Merge runs pairwise until one run covers the full array
    while run_boundaries.len() > 2 {
        let mut next_boundaries: Vec<usize> = vec![0]; // @step:merge

        let mut boundary_index = 0;
        while boundary_index + 2 <= run_boundaries.len() - 1 {
            let left_start = run_boundaries[boundary_index]; // @step:merge
            let right_start = run_boundaries[boundary_index + 1]; // @step:merge
            let merge_end = run_boundaries[boundary_index + 2]; // @step:merge

            // In-place merge using rotation
            let mut left_pointer = left_start; // @step:compare
            let mut right_pointer = right_start; // @step:compare

            while left_pointer < right_pointer && right_pointer < merge_end {
                // @step:compare
                if sorted_array[left_pointer] <= sorted_array[right_pointer] {
                    // @step:compare
                    left_pointer += 1; // @step:compare
                } else {
                    // Rotate the element from right_pointer into the correct position
                    let displaced_value = sorted_array[right_pointer]; // @step:rotate

                    // Shift elements from left_pointer to right_pointer-1 one position right
                    for shift_index in (left_pointer + 1..=right_pointer).rev() {
                        // @step:swap
                        sorted_array[shift_index] = sorted_array[shift_index - 1]; // @step:swap
                    }
                    sorted_array[left_pointer] = displaced_value; // @step:swap
                    left_pointer += 1; // @step:swap
                    right_pointer += 1; // @step:swap
                }
            }

            next_boundaries.push(merge_end); // @step:merge
            boundary_index += 2;
        }

        // If there is an odd run left, carry its end boundary over unchanged
        if (run_boundaries.len() - 1) % 2 == 1 {
            next_boundaries.push(array_length); // @step:merge
        }

        run_boundaries = next_boundaries; // @step:merge

        // @step:mark-sorted
    }

    sorted_array // @step:complete
}
