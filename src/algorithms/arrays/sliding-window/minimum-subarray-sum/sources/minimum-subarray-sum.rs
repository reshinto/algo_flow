// Minimum Subarray Sum — O(n) inverted Kadane's algorithm tracking minimum instead of maximum
fn minimum_subarray_sum(input_array: &[i32]) -> (i32, usize, usize) {
    if input_array.is_empty() {
        // @step:initialize
        return (0, 0, 0); // @step:initialize
    }

    let mut min_ending_here = input_array[0]; // @step:initialize
    let mut min_so_far = input_array[0]; // @step:initialize
    let mut current_start_index = 0usize;
    let mut best_start_index = 0usize;
    let mut best_end_index = 0usize;

    // Extend the current subarray or restart from the current element
    for element_index in 1..input_array.len() {
        if input_array[element_index] < min_ending_here + input_array[element_index] {
            // @step:compare
            min_ending_here = input_array[element_index]; // @step:compare
            current_start_index = element_index; // @step:compare
        } else {
            min_ending_here += input_array[element_index]; // @step:compare
        }

        if min_ending_here < min_so_far {
            // @step:compare
            min_so_far = min_ending_here; // @step:compare
            best_start_index = current_start_index; // @step:compare
            best_end_index = element_index; // @step:compare
        }
    }

    (min_so_far, best_start_index, best_end_index) // @step:complete
}
