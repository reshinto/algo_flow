// Kadane's Algorithm — O(n) maximum subarray sum via extend-or-restart decision
fn kadanes_algorithm(input_array: &[i32]) -> (i32, i64, i64) {
    if input_array.is_empty() {
        // @step:initialize
        return (0, -1, -1); // @step:initialize
    }

    let mut current_sum = input_array[0]; // @step:initialize
    let mut global_max = input_array[0]; // @step:initialize
    let mut current_start = 0usize;
    let mut best_start = 0usize;
    let mut best_end = 0usize;

    for scan_index in 1..input_array.len() {
        let extend_sum = current_sum + input_array[scan_index]; // @step:compare
        let restart_sum = input_array[scan_index]; // @step:compare

        if restart_sum > extend_sum {
            // @step:compare
            current_sum = restart_sum; // @step:shrink-window
            current_start = scan_index; // @step:shrink-window
        } else {
            current_sum = extend_sum; // @step:expand-window
        }

        if current_sum > global_max {
            // @step:visit
            global_max = current_sum; // @step:visit
            best_start = current_start; // @step:visit
            best_end = scan_index; // @step:visit
        }
    }

    (global_max, best_start as i64, best_end as i64) // @step:complete
}
