// Counting Sort — count occurrences of each value, then place elements in sorted order
fn counting_sort_distribution(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    if input_array.is_empty() {
        return vec![]; // @step:initialize
    }
    let mut working_array = input_array.to_vec(); // @step:initialize
    let array_length = working_array.len(); // @step:initialize

    // Find the range of values
    let mut min_value = working_array[0]; // @step:initialize
    let mut max_value = working_array[0]; // @step:initialize
    for scan_index in 1..array_length {
        // @step:initialize
        if working_array[scan_index] < min_value {
            min_value = working_array[scan_index]; // @step:initialize
        }
        if working_array[scan_index] > max_value {
            max_value = working_array[scan_index]; // @step:initialize
        }
    }

    let range = (max_value - min_value + 1) as usize; // @step:initialize
    let mut count_array = vec![0i64; range]; // @step:initialize

    // Count occurrences of each value
    for count_index in 0..array_length {
        // @step:count,compare
        let bucket_position = (working_array[count_index] - min_value) as usize; // @step:count,compare
        count_array[bucket_position] += 1; // @step:count
    }

    // Place elements back into the array in sorted order
    let mut write_index = 0usize; // @step:place
    for value_index in 0..range {
        // @step:place
        while count_array[value_index] > 0 {
            // @step:place
            working_array[write_index] = value_index as i64 + min_value; // @step:place
            write_index += 1; // @step:place
            count_array[value_index] -= 1; // @step:place
        }
    }

    // @step:mark-sorted
    working_array // @step:complete
}
