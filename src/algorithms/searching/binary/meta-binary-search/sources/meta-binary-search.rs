// Meta Binary Search (One-Sided Binary Search) — uses bit manipulation to build position
fn meta_binary_search(sorted_array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    if array_length == 0 {
        return -1; // @step:initialize
    }

    let bit_count = (usize::BITS - array_length.leading_zeros() - 1) as i32; // @step:initialize
    let mut position = 0usize; // @step:initialize

    let mut bit_index = bit_count; // @step:compare
    while bit_index >= 0 {
        // @step:compare
        let new_position = position | (1 << bit_index); // @step:compare

        if new_position < array_length && sorted_array[new_position] <= target_value {
            // @step:compare,eliminate
            position = new_position; // @step:eliminate
        }
        bit_index -= 1; // @step:compare
    }

    if sorted_array[position] == target_value {
        // @step:compare,found
        return position as i32; // @step:found
    }

    -1 // @step:complete
}
