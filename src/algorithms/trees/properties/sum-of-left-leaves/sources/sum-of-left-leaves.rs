// Sum of Left Leaves — recursive: sum values of all left leaf nodes

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn dfs(node: &Option<Box<TreeNode>>, is_left: bool) -> i32 {
    let node = match node {
        None => return 0, // @step:initialize
        Some(n) => n,
    };

    // Left leaf node contributes its value
    if node.left.is_none() && node.right.is_none() && is_left {
        // @step:visit
        return node.value; // @step:add-to-result
    }

    let left_sum = dfs(&node.left, true);   // @step:traverse-left
    let right_sum = dfs(&node.right, false); // @step:traverse-right
    left_sum + right_sum                     // @step:compute-value
}

fn sum_of_left_leaves(root: Option<Box<TreeNode>>) -> i32 {
    if root.is_none() {
        return 0; // @step:initialize
    }

    dfs(&root, false) // @step:complete
}
