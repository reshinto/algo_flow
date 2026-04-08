// Build BST from Level-Order Sequence
// Insert each value from the level-order array into a BST using standard BST insertion.
// The resulting tree's level-order traversal will match the input array.

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn bst_insert(current: Option<Box<TreeNode>>, value: i32) -> Box<TreeNode> {
    // @step:initialize
    match current {
        None => Box::new(TreeNode { value, left: None, right: None }), // @step:build-node
        Some(mut node) => {
            if value < node.value {
                node.left = Some(bst_insert(node.left, value)); // @step:connect-child
            } else if value > node.value {
                node.right = Some(bst_insert(node.right, value)); // @step:connect-child
            }
            node // @step:visit
        }
    }
}

fn build_from_level_order(level_order: &[i32]) -> Option<Box<TreeNode>> {
    if level_order.is_empty() {
        return None; // @step:initialize
    }

    let mut root: Option<Box<TreeNode>> = None; // @step:initialize

    for &value in level_order {
        // @step:select-element
        root = Some(bst_insert(root, value)); // @step:build-node
    }

    root // @step:complete
}
