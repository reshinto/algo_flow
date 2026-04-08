// Spread Sort — hybrid distribution sort: distribute into bins by value, then insertion sort small bins
fn spread_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:complete
    }

    let min_value = *sorted_array.iter().min().unwrap(); // @step:initialize
    let max_value = *sorted_array.iter().max().unwrap(); // @step:initialize

    if min_value == max_value {
        return sorted_array; // @step:complete
    }

    // Number of bins — sqrt(n) is a common heuristic
    let bin_count = (array_length as f64).sqrt().ceil().max(2.0) as usize; // @step:initialize
    let mut bins: Vec<Vec<i64>> = vec![vec![]; bin_count]; // @step:initialize
    let value_range = (max_value - min_value + 1) as f64; // @step:initialize

    // Distribute elements into bins based on value
    for distribute_index in 0..array_length {
        // @step:distribute
        let normalized_offset = (sorted_array[distribute_index] - min_value) as f64; // @step:distribute
        let bin_index = ((normalized_offset / value_range) * bin_count as f64) as usize; // @step:distribute
        let bin_index = bin_index.min(bin_count - 1); // @step:distribute
        bins[bin_index].push(sorted_array[distribute_index]); // @step:distribute
    }

    // Process each bin — insertion sort for small bins, recurse for large
    let mut write_index = 0; // @step:compare
    for bin_index in 0..bin_count {
        let bin = &mut bins[bin_index]; // @step:compare
        if bin.is_empty() {
            continue; // @step:compare
        }

        // Insertion sort within the bin
        for outer_index in 1..bin.len() {
            // @step:compare
            let current_value = bin[outer_index]; // @step:compare
            let mut insert_position = outer_index as isize - 1; // @step:compare
            while insert_position >= 0 && bin[insert_position as usize] > current_value {
                // @step:compare
                bin[(insert_position + 1) as usize] = bin[insert_position as usize]; // @step:swap
                insert_position -= 1; // @step:swap
            }
            bin[(insert_position + 1) as usize] = current_value; // @step:swap
        }

        // Write sorted bin back to the main array
        for &bin_value in bin.iter() {
            sorted_array[write_index] = bin_value; // @step:mark-sorted
            write_index += 1; // @step:mark-sorted
        }
    }

    sorted_array // @step:complete
}
