// XOR Range Query — O(n) build, O(1) per query via prefix XOR difference
fn xor_range_query(input_array: &[i32], queries: &[[usize; 2]]) -> (Vec<i32>, Vec<i32>) {
    let mut prefix_xor = vec![0i32; input_array.len() + 1]; // @step:initialize

    // Build prefix XOR array where prefix_xor[i] = XOR of input_array[0..i-1]
    for build_index in 0..input_array.len() {
        // @step:visit
        prefix_xor[build_index + 1] = prefix_xor[build_index] ^ input_array[build_index]; // @step:visit
    }

    let mut query_results: Vec<i32> = Vec::new(); // @step:compare

    // Answer range XOR queries in O(1) each using prefix XOR difference
    for query_index in 0..queries.len() {
        let left_bound = queries[query_index][0];
        let right_bound = queries[query_index][1];
        let range_xor = prefix_xor[right_bound + 1] ^ prefix_xor[left_bound]; // @step:compare
        query_results.push(range_xor); // @step:compare
    }

    (prefix_xor[1..].to_vec(), query_results) // @step:complete
}
