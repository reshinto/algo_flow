// Uniform Binary Search — precomputes delta lookup table for uniform jump sizes
fn uniform_binary_search(sorted_array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    if array_length == 0 {
        return -1; // @step:initialize
    }

    // Build the delta lookup table: delta[k] = ceil(delta[k-1] / 2)
    let mut delta_table: Vec<usize> = Vec::new(); // @step:initialize
    let mut delta_value = (array_length + 1) / 2; // @step:initialize (ceiling division)
    delta_table.push(delta_value); // @step:initialize
    while delta_value > 1 {
        // @step:initialize
        delta_value = (delta_value + 1) / 2; // @step:initialize
        delta_table.push(delta_value); // @step:initialize
    }
    // Ensure enough steps to reach any element in the array
    let log2_len = (usize::BITS - array_length.leading_zeros()) as usize;
    if delta_table.len() < log2_len + 1 {
        // @step:initialize
        delta_table.push(1); // @step:initialize
    }

    let mut current_index = delta_table[0].saturating_sub(1); // @step:initialize
    let mut step_level = 0usize; // @step:initialize

    loop {
        // @step:compare
        let current_value = sorted_array[current_index]; // @step:compare

        if current_value == target_value {
            // @step:compare,found
            return current_index as i32; // @step:found
        }

        step_level += 1; // @step:eliminate
        let next_delta = delta_table.get(step_level).copied().unwrap_or(0); // @step:eliminate

        if next_delta == 0 {
            break; // @step:eliminate
        }

        let previous_index = current_index; // @step:eliminate
        if current_value < target_value {
            // @step:eliminate
            // Move right
            current_index = (current_index + next_delta).min(array_length - 1); // @step:eliminate
        } else {
            // @step:eliminate
            // Move left
            current_index = current_index.saturating_sub(next_delta); // @step:eliminate
        }
        if current_index == previous_index {
            break; // @step:eliminate
        }
    }

    -1 // @step:complete
}
