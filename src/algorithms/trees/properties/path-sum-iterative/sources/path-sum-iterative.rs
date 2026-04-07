// Path Sum (Iterative) — stack-based DFS with running sum tracking

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn path_sum_iterative(root: Option<Box<TreeNode>>, target_sum: i32) -> bool {
    let root = match root {
        None => return false, // @step:initialize
        Some(r) => r,
    };

    let root_value = root.value;
    let mut node_stack: Vec<(Box<TreeNode>, i32)> = vec![(root, root_value)]; // @step:initialize

    while let Some((current, running_sum)) = node_stack.pop() {
        // @step:visit

        // Leaf node — check if path sum matches target
        if current.left.is_none() && current.right.is_none() {
            // @step:check-balance
            if running_sum == target_sum {
                return true; // @step:complete
            }
        }

        if let Some(right) = current.right {
            // @step:traverse-right
            let right_value = right.value;
            node_stack.push((right, running_sum + right_value)); // @step:traverse-right
        }

        if let Some(left) = current.left {
            // @step:traverse-left
            let left_value = left.value;
            node_stack.push((left, running_sum + left_value)); // @step:traverse-left
        }
    }

    false // @step:complete
}
