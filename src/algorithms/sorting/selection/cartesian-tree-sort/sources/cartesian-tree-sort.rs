// Cartesian Tree Sort — build a min-heap Cartesian tree, then repeatedly extract the minimum root

fn cartesian_tree_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let array_length = input_array.len(); // @step:initialize
    if array_length == 0 {
        return vec![]; // @step:initialize
    }

    // Build the Cartesian tree using an index-based O(n) stack construction.
    // Each node stores left and right child indices (usize::MAX = no child).
    // @step:build-tree
    let none_idx = usize::MAX;
    let mut left_child: Vec<usize> = vec![none_idx; array_length]; // @step:build-tree
    let mut right_child: Vec<usize> = vec![none_idx; array_length]; // @step:build-tree
    let mut node_stack: Vec<usize> = Vec::new(); // @step:build-tree

    for build_index in 0..array_length {
        let current_value = input_array[build_index]; // @step:compare

        // Pop nodes from the stack that are larger than the current value (min-heap property)
        let mut last_popped_idx: usize = none_idx; // @step:swap
        while node_stack.last().map_or(false, |&top| input_array[top] > current_value) {
            // @step:swap
            last_popped_idx = node_stack.pop().unwrap(); // @step:swap
        }
        left_child[build_index] = last_popped_idx; // @step:swap

        // Link the current node as right child of the new top (if any)
        if let Some(&top) = node_stack.last() {
            right_child[top] = build_index; // @step:swap
        }

        node_stack.push(build_index); // @step:swap
    }

    // The root is the first element remaining in the stack (minimum value overall)
    let root_idx = if node_stack.is_empty() { none_idx } else { node_stack[0] }; // @step:build-tree

    // Merge two Cartesian sub-trees (by index) while maintaining min-heap order
    fn merge_trees(
        left_idx: usize,
        right_idx: usize,
        input_array: &[i64],
        left_child: &mut Vec<usize>,
        right_child: &mut Vec<usize>,
        none_idx: usize,
    ) -> usize {
        if left_idx == none_idx { return right_idx; } // @step:extract
        if right_idx == none_idx { return left_idx; } // @step:extract

        if input_array[left_idx] <= input_array[right_idx] {
            // @step:compare
            let merged = merge_trees(right_child[left_idx], right_idx, input_array, left_child, right_child, none_idx);
            right_child[left_idx] = merged; // @step:extract
            left_idx // @step:extract
        } else {
            let merged = merge_trees(left_idx, left_child[right_idx], input_array, left_child, right_child, none_idx);
            left_child[right_idx] = merged; // @step:extract
            right_idx // @step:extract
        }
    }

    // Repeatedly extract the minimum (root) and merge its two subtrees
    let mut result_array: Vec<i64> = Vec::new(); // @step:extract
    let mut current_root = root_idx;

    while current_root != none_idx {
        result_array.push(input_array[current_root]); // @step:mark-sorted

        // Merge left and right subtrees to form the new tree without the extracted root
        let left = left_child[current_root];
        let right = right_child[current_root];
        current_root = merge_trees(left, right, input_array, &mut left_child, &mut right_child, none_idx); // @step:extract
    }

    result_array // @step:complete
}
