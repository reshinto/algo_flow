// Binary Tree Tilt — post-order: tilt = abs(left sum - right sum), accumulate total tilt

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn subtree_sum(node: &Option<Box<TreeNode>>, total_tilt: &mut i32) -> i32 {
    match node {
        None => 0, // @step:initialize
        Some(current) => {
            let left_sum = subtree_sum(&current.left, total_tilt);   // @step:traverse-left
            let right_sum = subtree_sum(&current.right, total_tilt); // @step:traverse-right

            // Tilt at this node is absolute difference of left and right sums
            let node_tilt = (left_sum - right_sum).abs(); // @step:compute-value
            *total_tilt += node_tilt; // @step:add-to-result

            left_sum + right_sum + current.value // @step:update-height
        }
    }
}

fn binary_tree_tilt(root: &Option<Box<TreeNode>>) -> i32 {
    let mut total_tilt = 0; // @step:initialize
    subtree_sum(root, &mut total_tilt); // @step:initialize
    total_tilt // @step:complete
}
