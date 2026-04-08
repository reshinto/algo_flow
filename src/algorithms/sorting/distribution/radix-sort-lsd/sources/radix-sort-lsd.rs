// Radix Sort LSD — sort integers digit by digit from least to most significant
fn radix_sort_lsd(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    if input_array.is_empty() {
        return vec![]; // @step:initialize
    }
    let mut working_array = input_array.to_vec(); // @step:initialize
    let array_length = working_array.len(); // @step:initialize

    // Offset negatives so all values are non-negative
    let min_value = *working_array.iter().min().unwrap(); // @step:initialize
    let offset: i64 = if min_value < 0 { -min_value } else { 0 }; // @step:initialize
    for offset_index in 0..array_length {
        // @step:initialize
        working_array[offset_index] += offset; // @step:initialize
    }

    let max_value = *working_array.iter().max().unwrap(); // @step:initialize

    // Process each digit position from least significant to most significant
    let mut digit_divisor: i64 = 1; // @step:initialize
    while max_value / digit_divisor > 0 {
        // @step:extract-digit
        let base: usize = 10; // @step:extract-digit
        let mut buckets: Vec<Vec<i64>> = vec![vec![]; base]; // @step:extract-digit

        // Distribute elements into buckets based on current digit
        for distribute_index in 0..array_length {
            // @step:extract-digit,compare
            let digit = ((working_array[distribute_index] / digit_divisor) % base as i64) as usize; // @step:extract-digit,compare
            buckets[digit].push(working_array[distribute_index]); // @step:extract-digit
        }

        // Collect elements back from buckets in order
        let mut write_index = 0; // @step:place
        for bucket_index in 0..base {
            // @step:place
            for &bucket_value in &buckets[bucket_index] {
                // @step:place
                working_array[write_index] = bucket_value; // @step:place
                write_index += 1; // @step:place
            }
        }

        digit_divisor *= base as i64; // @step:place
    }

    // Reverse the offset to restore original value range
    for restore_index in 0..array_length {
        // @step:mark-sorted
        working_array[restore_index] -= offset; // @step:mark-sorted
    }

    working_array // @step:complete
}
