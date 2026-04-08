// Min Size Subarray Sum — O(n) variable sliding window to find shortest subarray with sum >= target
fn min_size_subarray_sum(input_array: &[i32], target: i32) -> (usize, usize) {
    if input_array.is_empty() || target <= 0 {
        // @step:initialize
        return (0, 0); // @step:initialize
    }

    let mut left_pointer = 0usize; // @step:initialize
    let mut current_sum = 0i32;
    let mut min_length = usize::MAX;
    let mut best_start_index = 0usize;

    // Expand the right boundary of the window
    for right_pointer in 0..input_array.len() {
        current_sum += input_array[right_pointer]; // @step:expand-window

        // Shrink from the left while the sum constraint is satisfied
        while current_sum >= target {
            // @step:compare
            let window_length = right_pointer - left_pointer + 1; // @step:compare
            if window_length < min_length {
                // @step:compare
                min_length = window_length; // @step:compare
                best_start_index = left_pointer; // @step:compare
            }
            current_sum -= input_array[left_pointer]; // @step:shrink-window
            left_pointer += 1; // @step:shrink-window
        }
    }

    if min_length == usize::MAX {
        return (0, 0); // @step:complete
    }
    (min_length, best_start_index) // @step:complete
}
