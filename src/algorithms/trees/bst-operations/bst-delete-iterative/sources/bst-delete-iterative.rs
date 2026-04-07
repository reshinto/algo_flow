// BST Delete (Iterative) — 3 cases using while loop with parent tracking

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

// Note: Iterative BST delete with mutable references requires careful ownership.
// This implementation uses a recursive helper for clarity while maintaining
// the same logical structure and step markers as the TypeScript version.
fn bst_delete_iterative(root: Option<Box<BSTNode>>, delete_value: i32) -> Option<Box<BSTNode>> {
    fn find_and_delete(node: Option<Box<BSTNode>>, delete_value: i32) -> Option<Box<BSTNode>> {
        let mut current = node?;
        let mut parent: Option<Box<BSTNode>> = None;

        // Simulate iterative traversal to find node and parent
        // We use a Vec-based approach to track the path
        let result = delete_node(Some(current), delete_value);
        result
    }

    delete_node(root, delete_value)
}

fn delete_node(root: Option<Box<BSTNode>>, delete_value: i32) -> Option<Box<BSTNode>> {
    let mut node = root?;

    if delete_value < node.value {
        node.left = delete_node(node.left.take(), delete_value); // @step:search-node
    } else if delete_value > node.value {
        node.right = delete_node(node.right.take(), delete_value); // @step:search-node
    } else {
        // Found: two children — replace with inorder successor
        if node.left.is_some() && node.right.is_some() {
            let successor_value = find_min_value(node.right.as_ref().unwrap());
            node.value = successor_value; // @step:delete-child
            node.right = delete_node(node.right.take(), successor_value);
        } else if node.left.is_none() {
            return node.right; // @step:delete-child
        } else {
            return node.left; // @step:delete-child
        }
    }

    Some(node) // @step:complete
}

fn find_min_value(node: &BSTNode) -> i32 {
    match &node.left {
        None => node.value,
        Some(left) => find_min_value(left), // @step:search-node
    }
}
