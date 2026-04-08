// Lower Bound Search — find the first position where element >= target
fn lower_bound_search(sorted_array: &[i32], target_value: i32) -> usize {
    // @step:initialize
    let mut low_index = 0usize; // @step:initialize
    let mut high_index = sorted_array.len(); // @step:initialize
    let mut result_index = sorted_array.len(); // @step:initialize

    while low_index < high_index {
        let mid_index = low_index + (high_index - low_index) / 2; // @step:compare
        let mid_value = sorted_array[mid_index]; // @step:compare

        if mid_value >= target_value {
            // @step:compare,found
            // mid_value is a candidate — record it and search for an earlier occurrence
            result_index = mid_index; // @step:found
            high_index = mid_index; // @step:eliminate
        } else {
            // @step:eliminate
            // mid_value is too small — the lower bound must be to the right
            low_index = mid_index + 1; // @step:eliminate
        }
    }

    result_index // @step:complete
}
