// Segment Tree — build from array then query range sums

fn seg_sum_build_node(seg_tree: &mut Vec<i64>, array: &[i64], node_index: usize, low: usize, high: usize) {
    if low == high {
        seg_tree[node_index] = array[low]; // @step:build-node
        return;
    }
    let mid = (low + high) / 2;
    seg_sum_build_node(seg_tree, array, 2 * node_index, low, mid);       // @step:traverse-left
    seg_sum_build_node(seg_tree, array, 2 * node_index + 1, mid + 1, high); // @step:traverse-right
    seg_tree[node_index] = seg_tree[2 * node_index] + seg_tree[2 * node_index + 1]; // @step:update-segment
}

fn query_range(seg_tree: &Vec<i64>, node_index: usize, low: usize, high: usize, q_low: usize, q_high: usize) -> i64 {
    if q_low > high || q_high < low {
        return 0; // @step:query-range
    }
    if q_low <= low && high <= q_high {
        return seg_tree[node_index]; // @step:query-range
    }
    let mid = (low + high) / 2;
    let left_sum = query_range(seg_tree, 2 * node_index, low, mid, q_low, q_high);       // @step:traverse-left
    let right_sum = query_range(seg_tree, 2 * node_index + 1, mid + 1, high, q_low, q_high); // @step:traverse-right
    left_sum + right_sum // @step:query-range
}

fn segment_tree_range_sum(array: &[i64], queries: &[(usize, usize)]) -> Vec<i64> {
    let array_length = array.len(); // @step:initialize
    let mut seg_tree = vec![0i64; 4 * array_length]; // @step:initialize

    seg_sum_build_node(&mut seg_tree, array, 1, 0, array_length - 1); // @step:build-node

    let mut results = Vec::new();
    for &(q_low, q_high) in queries {
        results.push(query_range(&seg_tree, 1, 0, array_length - 1, q_low, q_high)); // @step:query-range
    }
    results // @step:complete
}
