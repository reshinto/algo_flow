// Double Selection Sort — find both minimum and maximum in each pass, place at both ends
fn double_selection_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    let mut left_bound = 0usize; // @step:initialize
    let mut right_bound = array_length.saturating_sub(1); // @step:initialize

    while left_bound < right_bound {
        let mut minimum_index = left_bound; // @step:compare
        let mut maximum_index = left_bound; // @step:compare

        // Scan between bounds to find both minimum and maximum
        for scan_index in (left_bound + 1)..=right_bound {
            // @step:compare
            if sorted_array[scan_index] < sorted_array[minimum_index] {
                // @step:compare
                minimum_index = scan_index; // @step:compare
            }
            if sorted_array[scan_index] > sorted_array[maximum_index] {
                // @step:compare
                maximum_index = scan_index; // @step:compare
            }
        }

        // Swap minimum to left bound
        if minimum_index != left_bound {
            // @step:swap
            sorted_array.swap(left_bound, minimum_index); // @step:swap
            // If maximum was at left_bound, it moved to minimum_index
            if maximum_index == left_bound {
                maximum_index = minimum_index; // @step:swap
            }
        }

        // Swap maximum to right bound
        if maximum_index != right_bound {
            // @step:swap
            sorted_array.swap(right_bound, maximum_index); // @step:swap
        }

        // Both ends are now in their sorted positions
        // @step:mark-sorted
        left_bound += 1; // @step:mark-sorted
        if right_bound == 0 {
            break;
        }
        right_bound -= 1; // @step:mark-sorted
    }

    sorted_array // @step:complete
}
