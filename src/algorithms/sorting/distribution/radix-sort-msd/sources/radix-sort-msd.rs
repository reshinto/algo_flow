// Radix Sort MSD — sort integers digit by digit from most to least significant (recursive)
fn radix_sort_msd(input_array: &[i64]) -> Vec<i64> {
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
    let base: i64 = 10; // @step:initialize

    // Determine the highest digit position
    let mut max_divisor: i64 = 1; // @step:initialize
    while max_divisor * base <= max_value {
        // @step:initialize
        max_divisor *= base; // @step:initialize
    }

    // Recursive helper that sorts a sub-slice by a given digit position
    fn sort_by_digit(sub_array: Vec<i64>, digit_divisor: i64, base: i64) -> Vec<i64> {
        // @step:extract-digit
        if sub_array.len() <= 1 || digit_divisor < 1 {
            return sub_array; // @step:extract-digit
        }

        let mut buckets: Vec<Vec<i64>> = vec![vec![]; base as usize]; // @step:extract-digit

        for &value in &sub_array {
            // @step:extract-digit,compare
            let digit = ((value / digit_divisor) % base) as usize; // @step:extract-digit,compare
            buckets[digit].push(value); // @step:extract-digit
        }

        let mut result: Vec<i64> = Vec::new(); // @step:place
        for bucket_index in 0..base as usize {
            // @step:place
            let sorted_bucket = sort_by_digit(buckets[bucket_index].clone(), digit_divisor / base, base); // @step:place
            for bucket_value in sorted_bucket {
                // @step:place
                result.push(bucket_value); // @step:place
            }
        }

        result // @step:place
    }

    let mut sorted = sort_by_digit(working_array, max_divisor, base);

    // Restore offset
    for restore_index in 0..array_length {
        // @step:mark-sorted
        sorted[restore_index] -= offset; // @step:mark-sorted
    }

    sorted // @step:complete
}
