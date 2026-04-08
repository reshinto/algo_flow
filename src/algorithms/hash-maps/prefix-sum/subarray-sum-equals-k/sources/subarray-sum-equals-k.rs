// Subarray Sum Equals K — count subarrays whose elements sum to the target using prefix sums and a hash map
use std::collections::HashMap;

fn subarray_sum_equals_k(numbers: &[i32], target: i32) -> i32 {
    let mut prefix_counts: HashMap<i32, i32> = HashMap::new(); // @step:initialize
    prefix_counts.insert(0, 1); // @step:initialize
    let mut current_sum = 0;
    let mut total_count = 0;
    for &num in numbers {
        current_sum += num; // @step:check-prefix
        let needed = current_sum - target; // @step:check-prefix
        if let Some(&count) = prefix_counts.get(&needed) {
            // @step:prefix-found
            total_count += count; // @step:prefix-found
        }
        // Store the running prefix sum count for future lookups
        *prefix_counts.entry(current_sum).or_insert(0) += 1; // @step:increment-count
    }
    total_count // @step:complete
}
