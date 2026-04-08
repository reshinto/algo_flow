// Minimum in Rotated Sorted Array — binary search variant finding the rotation pivot
fn min_rotated_array(sorted_array: &[i32]) -> i32 {
    // @step:initialize
    let mut low_index = 0usize; // @step:initialize
    let mut high_index = sorted_array.len() - 1; // @step:initialize

    while low_index < high_index {
        let mid_index = low_index + (high_index - low_index) / 2; // @step:compare
        let mid_value = sorted_array[mid_index]; // @step:compare
        let high_value = sorted_array[high_index]; // @step:compare

        if mid_value > high_value {
            // @step:compare,eliminate
            // Minimum is in the right half — discard left including mid
            low_index = mid_index + 1; // @step:eliminate
        } else {
            // @step:eliminate
            // Minimum is in the left half or at mid — discard right
            high_index = mid_index; // @step:eliminate
        }
    }

    sorted_array[low_index] // @step:found,complete
}
