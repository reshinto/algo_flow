// Prefix Sum — O(n) build, O(1) per query via prefix difference
fn prefix_sum(input_array: &[i32], queries: &[[usize; 2]]) -> (Vec<i32>, Vec<i32>) {
    let mut prefix_array = vec![0i32; input_array.len() + 1]; // @step:initialize

    // Build prefix sum array where prefix_array[i] = sum of input_array[0..i-1]
    for scan_index in 0..input_array.len() {
        // @step:visit
        prefix_array[scan_index + 1] = prefix_array[scan_index] + input_array[scan_index]; // @step:visit
    }

    let mut query_results: Vec<i32> = Vec::new(); // @step:compare

    // Answer range queries in O(1) each using prefix difference
    for query_index in 0..queries.len() {
        let left_bound = queries[query_index][0];
        let right_bound = queries[query_index][1];
        let range_sum = prefix_array[right_bound + 1] - prefix_array[left_bound]; // @step:compare
        query_results.push(range_sum); // @step:compare
    }

    (prefix_array[1..].to_vec(), query_results) // @step:complete
}
