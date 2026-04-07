// Count Complete Tree Nodes — if left height equals right height, nodes = 2^h - 1, else recurse

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn count_complete_tree_nodes(root: &Option<Box<TreeNode>>) -> u64 {
    if root.is_none() {
        return 0; // @step:initialize
    }

    let root_node = root.as_ref().unwrap();

    // Compute left-most height and right-most height
    let mut left_height: u32 = 0; // @step:initialize
    let mut right_height: u32 = 0; // @step:initialize

    let mut left_cursor: Option<&TreeNode> = Some(root_node.as_ref()); // @step:traverse-left
    while let Some(cursor) = left_cursor {
        // @step:traverse-left
        left_height += 1; // @step:update-height
        left_cursor = cursor.left.as_deref(); // @step:traverse-left
    }

    let mut right_cursor: Option<&TreeNode> = Some(root_node.as_ref()); // @step:traverse-right
    while let Some(cursor) = right_cursor {
        // @step:traverse-right
        right_height += 1; // @step:update-height
        right_cursor = cursor.right.as_deref(); // @step:traverse-right
    }

    // If heights match, the tree is a perfect binary tree
    if left_height == right_height {
        // @step:check-balance
        return (1u64 << left_height) - 1; // @step:add-to-result
    }

    // Otherwise recurse on both subtrees
    let left_count = count_complete_tree_nodes(&root_node.left);   // @step:traverse-left
    let right_count = count_complete_tree_nodes(&root_node.right); // @step:traverse-right
    left_count + right_count + 1 // @step:add-to-result
}
