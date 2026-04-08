// Sum Root to Leaf Numbers (Iterative) — stack-based number formation

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn sum_root_to_leaf_numbers_iterative(root: Option<Box<TreeNode>>) -> i32 {
    let root = match root {
        None => return 0, // @step:initialize
        Some(r) => r,
    };

    let mut total_sum = 0; // @step:initialize
    let root_value = root.value;
    let mut node_stack: Vec<(Box<TreeNode>, i32)> = vec![(root, root_value)]; // @step:initialize

    while let Some((current, running_number)) = node_stack.pop() {
        // @step:visit

        // Leaf node — add completed number to total
        if current.left.is_none() && current.right.is_none() {
            // @step:check-balance
            total_sum += running_number; // @step:add-to-result
        }

        if let Some(right) = current.right {
            // @step:traverse-right
            let right_value = right.value;
            node_stack.push((right, running_number * 10 + right_value)); // @step:traverse-right
        }

        if let Some(left) = current.left {
            // @step:traverse-left
            let left_value = left.value;
            node_stack.push((left, running_number * 10 + left_value)); // @step:traverse-left
        }
    }

    total_sum // @step:complete
}
