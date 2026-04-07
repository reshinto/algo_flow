// Sliding Window — O(n) max-sum subarray by sliding instead of recomputing
fn max_sum_subarray(input_array: &[i32], window_size: usize) -> (i32, usize) {
    if input_array.is_empty() || window_size == 0 || window_size > input_array.len() {
        // @step:initialize
        return (0, 0); // @step:initialize
    }

    // Compute the sum of the first window as the baseline
    let mut current_sum = 0i32; // @step:move-window
    for init_index in 0..window_size {
        // @step:move-window
        current_sum += input_array[init_index]; // @step:move-window
    }
    let mut max_sum = current_sum;
    let mut window_start_index = 0usize;

    // Slide the window: subtract left element, add right element
    for right_index in window_size..input_array.len() {
        current_sum -= input_array[right_index - window_size]; // @step:shrink-window
        current_sum += input_array[right_index]; // @step:expand-window

        if current_sum > max_sum {
            // @step:compare
            max_sum = current_sum; // @step:compare
            window_start_index = right_index - window_size + 1; // @step:compare
        }
    }

    (max_sum, window_start_index) // @step:complete
}
