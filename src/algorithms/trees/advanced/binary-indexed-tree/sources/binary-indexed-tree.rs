// Binary Indexed Tree (Fenwick Tree) — prefix sum queries and point updates

fn update(bit: &mut Vec<i32>, array_length: usize, mut bit_index: usize, delta: i32) {
    while bit_index <= array_length {
        bit[bit_index] += delta; // @step:update-segment
        bit_index += bit_index & bit_index.wrapping_neg();
    }
}

fn prefix_sum(bit: &Vec<i32>, mut bit_index: usize) -> i32 {
    let mut total_sum = 0;
    while bit_index > 0 {
        total_sum += bit[bit_index]; // @step:compute-prefix
        bit_index -= bit_index & bit_index.wrapping_neg();
    }
    total_sum // @step:compute-prefix
}

fn binary_indexed_tree(array: &[i32], queries: &[(usize, usize)]) -> Vec<i32> {
    let array_length = array.len(); // @step:initialize
    let mut bit = vec![0i32; array_length + 1]; // @step:initialize

    // Build BIT from array (1-indexed)
    for (pos, &element) in array.iter().enumerate() {
        update(&mut bit, array_length, pos + 1, element); // @step:update-segment
    }

    let mut results = Vec::new();
    for &(query_low, query_high) in queries {
        // Range sum [query_low, query_high] = prefix[query_high+1] - prefix[query_low]
        let range_sum = prefix_sum(&bit, query_high + 1) - prefix_sum(&bit, query_low); // @step:query-range
        results.push(range_sum);
    }
    results // @step:complete
}
