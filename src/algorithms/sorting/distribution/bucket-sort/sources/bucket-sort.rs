// Bucket Sort — distribute elements into buckets, sort each bucket, then concatenate
fn bucket_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    if input_array.is_empty() {
        return vec![]; // @step:initialize
    }
    let mut working_array = input_array.to_vec(); // @step:initialize
    let array_length = working_array.len(); // @step:initialize

    let min_value = *working_array.iter().min().unwrap(); // @step:initialize
    let max_value = *working_array.iter().max().unwrap(); // @step:initialize
    let bucket_count = array_length.max(1); // @step:initialize
    let value_range = max_value - min_value + 1; // @step:initialize

    // Create empty buckets
    let mut buckets: Vec<Vec<i64>> = vec![Vec::new(); bucket_count]; // @step:initialize

    // Distribute elements into buckets based on their normalized position
    for distribute_index in 0..array_length {
        // @step:distribute
        let normalized_position = working_array[distribute_index] - min_value; // @step:distribute
        let bucket_index = ((normalized_position * bucket_count as i64 / value_range) as usize)
            .min(bucket_count - 1); // @step:distribute
        buckets[bucket_index].push(working_array[distribute_index]); // @step:distribute
    }

    // Sort each bucket using insertion sort
    for bucket_index in 0..bucket_count {
        // @step:compare
        let bucket = &mut buckets[bucket_index]; // @step:compare
        for outer_index in 1..bucket.len() {
            // @step:compare
            let current_value = bucket[outer_index]; // @step:compare
            let mut insert_position = outer_index as isize - 1; // @step:compare
            while insert_position >= 0 && bucket[insert_position as usize] > current_value {
                // @step:swap
                bucket[(insert_position + 1) as usize] = bucket[insert_position as usize]; // @step:swap
                insert_position -= 1; // @step:swap
            }
            bucket[(insert_position + 1) as usize] = current_value; // @step:swap
        }
    }

    // Collect all elements from sorted buckets
    let mut write_index = 0usize; // @step:collect
    for bucket_index in 0..bucket_count {
        // @step:collect
        let bucket = buckets[bucket_index].clone();
        for bucket_value in bucket {
            // @step:collect
            working_array[write_index] = bucket_value; // @step:collect
            write_index += 1; // @step:collect
        }
    }

    // @step:mark-sorted
    working_array // @step:complete
}
