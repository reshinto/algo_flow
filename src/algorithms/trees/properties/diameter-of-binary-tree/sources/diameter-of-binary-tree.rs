// Diameter of Binary Tree — track max of (leftHeight + rightHeight) at each node

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn diameter_of_binary_tree(root: Option<Box<TreeNode>>) -> i32 {
    let mut max_diameter = 0; // @step:initialize

    fn compute_height(node: &Option<Box<TreeNode>>, max_diameter: &mut i32) -> i32 {
        let node = match node {
            None => return 0, // @step:initialize
            Some(n) => n,
        };

        let left_height = compute_height(&node.left, max_diameter); // @step:traverse-left
        let right_height = compute_height(&node.right, max_diameter); // @step:traverse-right

        // Update global max diameter — path through this node spans leftHeight + rightHeight edges
        *max_diameter = (*max_diameter).max(left_height + right_height); // @step:update-height

        left_height.max(right_height) + 1 // @step:update-height
    }

    compute_height(&root, &mut max_diameter); // @step:initialize
    max_diameter // @step:complete
}
