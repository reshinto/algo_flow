// Sum of Left Leaves (Iterative) — stack-based DFS checking left leaf condition

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn sum_of_left_leaves_iterative(root: Option<Box<TreeNode>>) -> i32 {
    let root = match root {
        None => return 0, // @step:initialize
        Some(r) => r,
    };

    let mut node_stack: Vec<(Box<TreeNode>, bool)> = vec![(root, false)]; // @step:initialize
    let mut total_sum = 0; // @step:initialize

    while let Some((current, is_left)) = node_stack.pop() {
        // @step:visit

        // Accumulate value when we find a left leaf
        if current.left.is_none() && current.right.is_none() && is_left {
            // @step:check-balance
            total_sum += current.value; // @step:add-to-result
        }

        if let Some(right) = current.right {
            // @step:traverse-right
            node_stack.push((right, false)); // @step:traverse-right
        }

        if let Some(left) = current.left {
            // @step:traverse-left
            node_stack.push((left, true)); // @step:traverse-left
        }
    }

    total_sum // @step:complete
}
