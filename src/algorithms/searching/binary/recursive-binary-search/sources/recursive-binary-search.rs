// Recursive Binary Search — halve the search range via recursive calls
fn recursive_binary_search(sorted_array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    fn search_range(sorted_array: &[i32], target_value: i32, low_index: usize, high_index: usize) -> i32 {
        // @step:initialize
        if low_index > high_index {
            // @step:complete
            return -1; // @step:complete
        }

        let mid_index = low_index + (high_index - low_index) / 2; // @step:compare
        let mid_value = sorted_array[mid_index]; // @step:compare

        if mid_value == target_value {
            // @step:compare,found
            return mid_index as i32; // @step:found
        } else if mid_value < target_value {
            // @step:eliminate
            // Target is in the upper half — discard the lower half
            return search_range(sorted_array, target_value, mid_index + 1, high_index); // @step:eliminate
        } else {
            // @step:eliminate
            // Target is in the lower half — discard the upper half
            if mid_index == 0 {
                return -1;
            }
            return search_range(sorted_array, target_value, low_index, mid_index - 1); // @step:eliminate
        }
    }

    if sorted_array.is_empty() {
        return -1;
    }
    search_range(sorted_array, target_value, 0, sorted_array.len() - 1) // @step:complete
}
