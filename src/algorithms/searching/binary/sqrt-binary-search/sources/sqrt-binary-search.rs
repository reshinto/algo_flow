// Square Root via Binary Search — find the integer square root of a non-negative number
fn sqrt_binary_search(target_value: i64) -> i64 {
    // @step:initialize
    if target_value < 2 {
        return target_value; // @step:initialize
    }
    let mut low_index = 1i64; // @step:initialize
    let mut high_index = target_value / 2; // @step:initialize
    let mut result_index = 0i64; // @step:initialize

    while low_index <= high_index {
        let mid_index = low_index + (high_index - low_index) / 2; // @step:compare
        let mid_squared = mid_index * mid_index; // @step:compare

        if mid_squared == target_value {
            // @step:compare,found
            return mid_index; // @step:found
        } else if mid_squared < target_value {
            // @step:eliminate
            // mid_index is a candidate floor — search for a larger value
            result_index = mid_index; // @step:eliminate
            low_index = mid_index + 1; // @step:eliminate
        } else {
            // @step:eliminate
            // mid_index is too large — search left
            high_index = mid_index - 1; // @step:eliminate
        }
    }

    result_index // @step:complete
}
