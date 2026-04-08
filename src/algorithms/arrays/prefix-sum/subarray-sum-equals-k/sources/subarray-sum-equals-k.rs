// Subarray Sum Equals K — O(n) via prefix sum + hash map
use std::collections::HashMap;

fn subarray_sum_equals_k(input_array: &[i32], target: i32) -> (usize, Vec<[i32; 2]>) {
    let mut prefix_sum_map: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    prefix_sum_map.insert(0, 1); // @step:initialize

    let mut running_sum = 0i32; // @step:initialize
    let mut found_count = 0usize; // @step:initialize
    let mut subarrays: Vec<[i32; 2]> = Vec::new(); // @step:initialize

    for scan_index in 0..input_array.len() {
        running_sum += input_array[scan_index]; // @step:visit

        let lookup_key = running_sum - target; // @step:compare

        if let Some(&match_count) = prefix_sum_map.get(&lookup_key) {
            // @step:compare
            found_count += match_count; // @step:compare
            subarrays.push([lookup_key, scan_index as i32]); // @step:compare
        }

        *prefix_sum_map.entry(running_sum).or_insert(0) += 1; // @step:visit
    }

    (found_count, subarrays) // @step:complete
}
