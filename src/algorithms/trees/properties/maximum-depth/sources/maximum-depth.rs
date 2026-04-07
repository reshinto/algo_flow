// Maximum Depth of Binary Tree — recursive DFS returning max(left, right) + 1

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn maximum_depth(root: Option<Box<TreeNode>>) -> i32 {
    match root {
        None => 0, // @step:initialize
        Some(node) => {
            // Recursively compute depth of left and right subtrees
            let left_depth = maximum_depth(node.left);   // @step:traverse-left
            let right_depth = maximum_depth(node.right); // @step:traverse-right

            // Return the larger subtree depth plus 1 for the current node
            left_depth.max(right_depth) + 1 // @step:update-height
        }
    }
}
