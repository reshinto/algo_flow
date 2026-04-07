// Proxmap Sort — proximity map sorting: map each element to its approximate final position, then insertion sort locally
fn proxmap_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut source_array = input_array.to_vec(); // @step:initialize
    let array_length = source_array.len(); // @step:initialize

    if array_length <= 1 {
        return source_array; // @step:complete
    }

    let min_value = *source_array.iter().min().unwrap(); // @step:initialize
    let max_value = *source_array.iter().max().unwrap(); // @step:initialize

    if min_value == max_value {
        return source_array; // @step:complete
    }

    let value_range = (max_value - min_value) as f64; // @step:initialize
    let scale_factor = (array_length as f64 - 1.0) / value_range; // @step:initialize

    // Build proxmap — count how many elements map to each position
    let mut hit_count = vec![0usize; array_length]; // @step:map-position
    for map_index in 0..array_length {
        // @step:map-position
        let mapped_position = (scale_factor * (source_array[map_index] - min_value) as f64) as usize; // @step:map-position
        hit_count[mapped_position] += 1; // @step:map-position
    }

    // Compute starting positions for each cluster (prefix sums)
    let mut start_position = vec![0usize; array_length]; // @step:map-position
    let mut running_total = 0usize; // @step:map-position
    for pos_index in 0..array_length {
        // @step:map-position
        start_position[pos_index] = running_total; // @step:map-position
        running_total += hit_count[pos_index]; // @step:map-position
    }

    // Insert each element into the output array near its mapped position
    let mut output_array = vec![0i64; array_length]; // @step:compare
    let mut next_slot = start_position.clone(); // @step:compare

    for insert_index in 0..array_length {
        // @step:compare
        let current_value = source_array[insert_index]; // @step:compare
        let mapped_position = (scale_factor * (current_value - min_value) as f64) as usize; // @step:compare
        let mut slot_index = next_slot[mapped_position]; // @step:compare

        // Insertion sort within the cluster to maintain order
        while slot_index > start_position[mapped_position] && output_array[slot_index - 1] > current_value {
            // @step:compare
            output_array[slot_index] = output_array[slot_index - 1]; // @step:swap
            slot_index -= 1; // @step:swap
        }
        output_array[slot_index] = current_value; // @step:swap
        next_slot[mapped_position] += 1; // @step:swap
    }

    // Copy sorted output back to source array
    for copy_index in 0..array_length {
        source_array[copy_index] = output_array[copy_index]; // @step:mark-sorted
    }

    source_array // @step:complete
}
