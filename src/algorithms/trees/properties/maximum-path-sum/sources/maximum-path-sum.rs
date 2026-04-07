// Maximum Path Sum — recursive: at each node compute max path through it, track global max

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn maximum_path_sum(root: Option<Box<TreeNode>>) -> i32 {
    let initial_max = match &root {
        Some(r) => r.value,
        None => i32::MIN,
    };
    let mut global_max = initial_max; // @step:initialize

    fn max_gain(node: &Option<Box<TreeNode>>, global_max: &mut i32) -> i32 {
        let node = match node {
            None => return 0, // @step:initialize
            Some(n) => n,
        };

        // Only include subtree if it contributes positively
        let left_gain = max_gain(&node.left, global_max).max(0);   // @step:traverse-left
        let right_gain = max_gain(&node.right, global_max).max(0); // @step:traverse-right

        // Path through this node: left branch + node value + right branch
        let path_through_node = node.value + left_gain + right_gain; // @step:compute-value
        *global_max = (*global_max).max(path_through_node);          // @step:update-height

        // Return max gain if we continue from this node to parent
        node.value + left_gain.max(right_gain) // @step:add-to-result
    }

    max_gain(&root, &mut global_max); // @step:initialize
    global_max                        // @step:complete
}
