// Cube Sort — divide into cube-root-sized blocks, sort each, then merge all blocks together
fn cube_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:initialize
    }

    // Compute block size as cube root of array length (minimum 1)
    let block_size = ((array_length as f64).cbrt().ceil() as usize).max(1); // @step:initialize

    // Phase 1: Insertion sort each block
    let block_count = (array_length + block_size - 1) / block_size;
    for block_index in 0..block_count {
        // @step:divide-block
        let block_start = block_index * block_size; // @step:divide-block
        let block_end = (block_start + block_size).min(array_length); // @step:divide-block

        // Insertion sort within this block
        for outer_index in (block_start + 1)..block_end {
            let current_value = sorted_array[outer_index]; // @step:compare
            let mut inner_index = outer_index as isize - 1;

            while inner_index >= block_start as isize && sorted_array[inner_index as usize] > current_value {
                // @step:swap
                sorted_array[(inner_index + 1) as usize] = sorted_array[inner_index as usize]; // @step:swap
                inner_index -= 1;
            }
            sorted_array[(inner_index + 1) as usize] = current_value; // @step:swap
        }
    }

    // Phase 2: Merge all sorted blocks using a k-way merge into a temporary array
    let mut result_array: Vec<i64> = vec![0; array_length];
    // Track the current position within each block
    let mut block_pointers: Vec<usize> = (0..block_count).map(|bi| bi * block_size).collect();

    for result_index in 0..array_length {
        // @step:merge-blocks
        let mut minimum_value = i64::MAX;
        let mut minimum_block: isize = -1;

        for block_index in 0..block_count {
            let pointer = block_pointers[block_index];
            let block_end = ((block_index + 1) * block_size).min(array_length);

            if pointer < block_end {
                // @step:compare
                if sorted_array[pointer] < minimum_value {
                    // @step:compare
                    minimum_value = sorted_array[pointer];
                    minimum_block = block_index as isize;
                }
            }
        }

        result_array[result_index] = minimum_value; // @step:merge-blocks
        if minimum_block >= 0 {
            block_pointers[minimum_block as usize] += 1; // @step:merge-blocks
        }
    }

    // Copy result back
    for copy_index in 0..array_length {
        sorted_array[copy_index] = result_array[copy_index]; // @step:mark-sorted
    }

    sorted_array // @step:complete
}
