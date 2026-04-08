// Is Symmetric Tree — recursive: compare left.left with right.right and left.right with right.left

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn is_mirror(left_node: &Option<Box<TreeNode>>, right_node: &Option<Box<TreeNode>>) -> bool {
    match (left_node, right_node) {
        (None, None) => true,  // @step:check-balance
        (None, Some(_)) | (Some(_), None) => false, // @step:check-balance
        (Some(left), Some(right)) => {
            if left.value != right.value {
                return false; // @step:check-balance
            }

            // Outer pair and inner pair must both be mirrors
            let outer_match = is_mirror(&left.left, &right.right); // @step:traverse-left
            let inner_match = is_mirror(&left.right, &right.left); // @step:traverse-right
            outer_match && inner_match // @step:check-balance
        }
    }
}

fn is_symmetric_tree(root: Option<Box<TreeNode>>) -> bool {
    match root {
        None => true, // @step:initialize
        Some(root) => is_mirror(&root.left, &root.right), // @step:complete
    }
}
