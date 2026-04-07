// Search in Rotated Sorted Array — binary search adapted for a rotated sorted array
fn search_rotated_array(sorted_array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    let mut low_index = 0usize; // @step:initialize
    let mut high_index = sorted_array.len().saturating_sub(1); // @step:initialize

    while low_index <= high_index {
        let mid_index = low_index + (high_index - low_index) / 2; // @step:compare
        let mid_value = sorted_array[mid_index]; // @step:compare

        if mid_value == target_value {
            // @step:compare,found
            return mid_index as i32; // @step:found
        }

        // Determine which half is sorted
        let low_value = sorted_array[low_index];
        if low_value <= mid_value {
            // @step:compare
            // Left half is sorted
            if low_value <= target_value && target_value < mid_value {
                // @step:eliminate
                // Target is within the sorted left half
                if mid_index == 0 {
                    break;
                }
                high_index = mid_index - 1; // @step:eliminate
            } else {
                // @step:eliminate
                // Target is in the right half
                low_index = mid_index + 1; // @step:eliminate
            }
        } else {
            // @step:compare
            // Right half is sorted
            let high_value = sorted_array[high_index];
            if mid_value < target_value && target_value <= high_value {
                // @step:eliminate
                // Target is within the sorted right half
                low_index = mid_index + 1; // @step:eliminate
            } else {
                // @step:eliminate
                // Target is in the left half
                if mid_index == 0 {
                    break;
                }
                high_index = mid_index - 1; // @step:eliminate
            }
        }
    }

    -1 // @step:complete
}
