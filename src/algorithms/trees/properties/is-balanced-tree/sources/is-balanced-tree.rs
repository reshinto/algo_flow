// Is Balanced Tree — recursive DFS checking abs(leftHeight - rightHeight) ≤ 1 at every node

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

// Returns -1 if unbalanced, otherwise returns height of the subtree
fn check_height(node: &Option<Box<TreeNode>>) -> i32 {
    let node = match node {
        None => return 0, // @step:initialize
        Some(n) => n,
    };

    let left_height = check_height(&node.left); // @step:traverse-left
    if left_height == -1 {
        return -1; // @step:check-balance
    }

    let right_height = check_height(&node.right); // @step:traverse-right
    if right_height == -1 {
        return -1; // @step:check-balance
    }

    // Unbalanced if height difference exceeds 1
    if (left_height - right_height).abs() > 1 {
        return -1; // @step:check-balance
    }

    left_height.max(right_height) + 1 // @step:update-height
}

fn is_balanced_tree(root: Option<Box<TreeNode>>) -> bool {
    check_height(&root) != -1 // @step:complete
}
