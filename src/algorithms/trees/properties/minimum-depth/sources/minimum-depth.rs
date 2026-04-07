// Minimum Depth of Binary Tree — recursive DFS to nearest leaf

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn minimum_depth(root: Option<Box<TreeNode>>) -> i32 {
    let root = match root {
        None => return 0, // @step:initialize
        Some(r) => r,
    };

    // If only right child exists, recurse right
    if root.left.is_none() && root.right.is_some() {
        // @step:visit
        return minimum_depth(root.right) + 1; // @step:traverse-right
    }

    // If only left child exists, recurse left
    if root.right.is_none() && root.left.is_some() {
        // @step:visit
        return minimum_depth(root.left) + 1; // @step:traverse-left
    }

    // If leaf node, depth is 1
    if root.left.is_none() && root.right.is_none() {
        // @step:visit
        return 1; // @step:update-height
    }

    // Both children exist — take minimum
    let left_depth = minimum_depth(root.left);   // @step:traverse-left
    let right_depth = minimum_depth(root.right); // @step:traverse-right
    left_depth.min(right_depth) + 1             // @step:update-height
}
