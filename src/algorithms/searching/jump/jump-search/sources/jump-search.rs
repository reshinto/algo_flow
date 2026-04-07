// Jump Search — jump forward by sqrt(n) blocks, then linear scan within the block
fn jump_search(sorted_array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    if array_length == 0 {
        return -1; // @step:initialize
    }

    let block_size = (array_length as f64).sqrt() as usize; // @step:initialize
    let mut block_start = 0usize; // @step:initialize
    let mut jump_end = block_size; // @step:initialize

    while jump_end < array_length && sorted_array[jump_end - 1] < target_value {
        // @step:visit
        block_start = jump_end; // @step:visit
        jump_end += block_size; // @step:visit
    }

    // Linear scan within the identified block
    let scan_end = jump_end.min(array_length); // @step:compare
    for current_index in block_start..scan_end {
        // @step:compare
        if sorted_array[current_index] == target_value {
            // @step:compare,found
            return current_index as i32; // @step:found
        }
    }

    -1 // @step:complete
}
