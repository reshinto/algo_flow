// Max Consecutive Ones III — O(n) variable sliding window with at most k zero-flips
fn max_consecutive_ones(input_array: &[i32], max_flips: usize) -> (usize, usize) {
    if input_array.is_empty() {
        // @step:initialize
        return (0, 0); // @step:initialize
    }

    let mut left_pointer = 0usize; // @step:initialize
    let mut zero_count = 0usize;
    let mut max_length = 0usize;
    let mut best_start_index = 0usize;

    // Expand the right boundary of the window
    for right_pointer in 0..input_array.len() {
        if input_array[right_pointer] == 0 {
            zero_count += 1; // @step:expand-window
        }

        // Shrink from left when zero count exceeds the allowed flips
        while zero_count > max_flips {
            // @step:compare
            if input_array[left_pointer] == 0 {
                zero_count -= 1; // @step:shrink-window
            }
            left_pointer += 1; // @step:shrink-window
        }

        let window_length = right_pointer - left_pointer + 1; // @step:compare
        if window_length > max_length {
            // @step:compare
            max_length = window_length; // @step:compare
            best_start_index = left_pointer; // @step:compare
        }
    }

    (max_length, best_start_index) // @step:complete
}
