// Ternary Search — divide the array into three parts on each iteration
fn ternary_search(sorted_array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    if sorted_array.is_empty() { return -1; } // @step:initialize
    let mut low_index = 0usize; // @step:initialize
    let mut high_index = sorted_array.len().saturating_sub(1); // @step:initialize

    while low_index <= high_index {
        let range_size = high_index - low_index; // @step:compare
        let mid1_index = low_index + range_size / 3; // @step:compare
        let mid2_index = high_index - range_size / 3; // @step:compare

        let mid1_value = sorted_array[mid1_index]; // @step:compare
        let mid2_value = sorted_array[mid2_index]; // @step:compare

        if mid1_value == target_value {
            // @step:compare,found
            return mid1_index as i32; // @step:found
        }

        if mid2_value == target_value {
            // @step:compare,found
            return mid2_index as i32; // @step:found
        }

        if target_value < mid1_value {
            // @step:eliminate
            // Target is in the left third
            if mid1_index == 0 {
                break;
            }
            high_index = mid1_index - 1; // @step:eliminate
        } else if target_value > mid2_value {
            // @step:eliminate
            // Target is in the right third
            low_index = mid2_index + 1; // @step:eliminate
        } else {
            // @step:eliminate
            // Target is in the middle third
            low_index = mid1_index + 1; // @step:eliminate
            if mid2_index == 0 {
                break;
            }
            high_index = mid2_index - 1; // @step:eliminate
        }
    }

    -1 // @step:complete
}
