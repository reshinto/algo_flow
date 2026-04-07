// Exponential Search — probe exponentially, then binary search in the bounded range
fn exponential_search(sorted_array: &[i32], target_value: i32) -> i32 {
    let array_length = sorted_array.len(); // @step:initialize
    if array_length == 0 {
        return -1; // @step:complete
    }

    if sorted_array[0] == target_value {
        // @step:visit
        return 0; // @step:found
    }

    // Phase 1: exponential probing to find the upper bound
    let mut bound_index = 1usize; // @step:visit
    while bound_index < array_length && sorted_array[bound_index] <= target_value {
        // @step:visit
        bound_index *= 2; // @step:visit
    }

    // Phase 2: binary search in the range [bound_index/2, min(bound_index, length-1)]
    let mut low_index = bound_index / 2; // @step:compare
    let mut high_index = (bound_index).min(array_length - 1); // @step:compare

    while low_index <= high_index {
        let mid_index = low_index + (high_index - low_index) / 2; // @step:compare
        let mid_value = sorted_array[mid_index]; // @step:compare

        if mid_value == target_value {
            // @step:compare,found
            return mid_index as i32; // @step:found
        } else if mid_value < target_value {
            // @step:eliminate
            low_index = mid_index + 1; // @step:eliminate
        } else {
            // @step:eliminate
            if mid_index == 0 {
                break;
            }
            high_index = mid_index - 1; // @step:eliminate
        }
    }

    -1 // @step:complete
}
