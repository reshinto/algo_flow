// Max Product Subarray — O(n) tracking both max and min products to handle negative flips
fn max_product_subarray(input_array: &[i32]) -> (i32, usize, usize) {
    let array_length = input_array.len();

    if array_length == 0 {
        // @step:initialize
        return (0, 0, 0); // @step:initialize
    }

    let mut current_max = input_array[0]; // @step:initialize
    let mut current_min = input_array[0]; // @step:initialize
    let mut global_max = input_array[0]; // @step:initialize
    let mut current_start = 0usize;
    let mut best_start = 0usize;
    let mut best_end = 0usize;

    for scan_index in 1..array_length {
        let current_element = input_array[scan_index]; // @step:compare

        // When multiplying by a negative, max and min swap roles
        if current_element < 0 {
            // @step:compare
            let temp_max = current_max; // @step:compare
            current_max = current_min; // @step:compare
            current_min = temp_max; // @step:compare
        }

        // Extend or restart the subarray
        current_max = current_element.max(current_max * current_element); // @step:compare
        current_min = current_element.min(current_min * current_element); // @step:compare

        if current_max == current_element {
            // @step:compare
            current_start = scan_index; // @step:compare
        }

        if current_max > global_max {
            // @step:compare
            global_max = current_max; // @step:compare
            best_start = current_start; // @step:compare
            best_end = scan_index; // @step:compare
        }
    }

    (global_max, best_start, best_end) // @step:complete
}
