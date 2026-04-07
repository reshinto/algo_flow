// Cartesian Tree Sort — build a min-heap Cartesian tree, then repeatedly extract the minimum root
struct CartesianNode {
    value: i64,
    left_child: Option<Box<CartesianNode>>,
    right_child: Option<Box<CartesianNode>>,
}

fn cartesian_tree_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let array_length = input_array.len(); // @step:initialize
    if array_length == 0 {
        return vec![]; // @step:initialize
    }

    // Build the Cartesian tree using a stack-based O(n) construction
    // @step:build-tree
    let mut node_stack: Vec<Box<CartesianNode>> = Vec::new(); // @step:build-tree

    for build_index in 0..array_length {
        let mut new_node = Box::new(CartesianNode {
            // @step:compare
            value: input_array[build_index], // @step:compare
            left_child: None,                // @step:compare
            right_child: None,               // @step:compare
        });

        // Pop nodes from the stack that are larger than the new node (min-heap property)
        let mut last_popped: Option<Box<CartesianNode>> = None; // @step:swap
        while node_stack.last().map_or(false, |top| top.value > new_node.value) {
            // @step:swap
            last_popped = node_stack.pop(); // @step:swap
        }
        new_node.left_child = last_popped; // @step:swap
        if let Some(top) = node_stack.last_mut() {
            top.right_child = Some(new_node); // @step:swap
        } else {
            node_stack.push(new_node); // @step:swap
        }
        if node_stack.last().map_or(true, |top| top.right_child.is_none()) {
            // already pushed above
        }
    }

    // The root of the tree is the leftmost element in the stack (minimum value)
    let mut tree_root: Option<Box<CartesianNode>> = node_stack.into_iter().next(); // @step:build-tree

    // Merge two Cartesian sub-trees while maintaining min-heap order
    fn merge_trees(
        left_tree: Option<Box<CartesianNode>>,
        right_tree: Option<Box<CartesianNode>>,
    ) -> Option<Box<CartesianNode>> {
        match (left_tree, right_tree) {
            (None, right) => right, // @step:extract
            (left, None) => left,   // @step:extract
            (Some(mut left), Some(mut right)) => {
                if left.value <= right.value {
                    // @step:compare
                    left.right_child = merge_trees(left.right_child.take(), Some(right)); // @step:extract
                    Some(left) // @step:extract
                } else {
                    right.left_child = merge_trees(Some(left), right.left_child.take()); // @step:extract
                    Some(right) // @step:extract
                }
            }
        }
    }

    // Repeatedly extract the minimum (root) and merge its two subtrees
    let mut result_array: Vec<i64> = Vec::new(); // @step:extract

    while let Some(root) = tree_root {
        result_array.push(root.value); // @step:mark-sorted

        // Merge left and right subtrees to form the new tree without the extracted root
        tree_root = merge_trees(root.left_child, root.right_child); // @step:extract
    }

    result_array // @step:complete
}
