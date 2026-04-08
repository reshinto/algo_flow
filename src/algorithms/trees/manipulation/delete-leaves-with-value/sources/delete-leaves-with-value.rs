// Delete Leaves With Value — post-order recursive: remove leaf if value matches target

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn delete_leaves_with_value(root: Option<Box<BinaryNode>>, target_value: i32) -> Option<Box<BinaryNode>> {
    match root {
        None => None, // @step:initialize
        Some(mut node) => {
            // Recursively process children first (post-order)
            node.left = delete_leaves_with_value(node.left, target_value); // @step:traverse-left
            node.right = delete_leaves_with_value(node.right, target_value); // @step:traverse-right

            // Check if the current node is now a leaf with the target value
            if node.left.is_none() && node.right.is_none() && node.value == target_value {
                // @step:compare
                return None; // @step:delete-node
            }

            Some(node) // @step:visit
        }
    }
}
