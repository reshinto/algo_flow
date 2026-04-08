// Binary Search — halve the search range on each iteration
fn binary_search(sorted_array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    if sorted_array.is_empty() { return -1; } // @step:initialize
    let mut low_index = 0usize; // @step:initialize
    let mut high_index = sorted_array.len().saturating_sub(1); // @step:initialize

    while low_index <= high_index {
        let mid_index = low_index + (high_index - low_index) / 2; // @step:compare
        let mid_value = sorted_array[mid_index]; // @step:compare

        if mid_value == target_value {
            // @step:compare,found
            return mid_index as i32; // @step:found
        } else if mid_value < target_value {
            // @step:eliminate
            // Target is in the upper half — discard the lower half
            low_index = mid_index + 1; // @step:eliminate
        } else {
            // @step:eliminate
            // Target is in the lower half — discard the upper half
            if mid_index == 0 {
                break;
            }
            high_index = mid_index - 1; // @step:eliminate
        }
    }

    -1 // @step:complete
}
