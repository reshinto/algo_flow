// Sum Root to Leaf Numbers — recursive: treat root-to-leaf paths as numbers, sum them

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn dfs(node: &Option<Box<TreeNode>>, running_number: i32) -> i32 {
    let node = match node {
        None => return 0, // @step:initialize
        Some(n) => n,
    };

    let current_number = running_number * 10 + node.value; // @step:compute-value

    // Leaf node — this path forms a complete number
    if node.left.is_none() && node.right.is_none() {
        // @step:visit
        return current_number; // @step:add-to-result
    }

    let left_sum = dfs(&node.left, current_number);   // @step:traverse-left
    let right_sum = dfs(&node.right, current_number); // @step:traverse-right
    left_sum + right_sum                               // @step:compute-value
}

fn sum_root_to_leaf_numbers(root: Option<Box<TreeNode>>) -> i32 {
    dfs(&root, 0) // @step:complete
}
