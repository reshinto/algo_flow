// BST From Sorted Array (Recursive) — pick middle as root, recurse on halves

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn build_bst(sorted_array: &[i32], left_index: usize, right_index: usize) -> Option<Box<BSTNode>> {
    if left_index > right_index {
        return None; // @step:initialize
    }

    // Pick the middle element as root to keep the tree balanced
    let mid_index = (left_index + right_index) / 2; // @step:build-node
    let mid_value = sorted_array[mid_index];

    let mut node = Box::new(BSTNode { value: mid_value, left: None, right: None });

    // Recursively build left and right subtrees
    if mid_index > 0 {
        node.left = build_bst(sorted_array, left_index, mid_index - 1); // @step:connect-child
    }
    node.right = build_bst(sorted_array, mid_index + 1, right_index); // @step:connect-child

    Some(node) // @step:complete
}

fn bst_from_sorted_array(sorted_array: &[i32]) -> Option<Box<BSTNode>> {
    if sorted_array.is_empty() {
        return None;
    }
    build_bst(sorted_array, 0, sorted_array.len() - 1)
}
