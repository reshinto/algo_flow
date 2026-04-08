// BST Delete (Recursive) — 3 cases: leaf, one child, two children with inorder successor

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn find_min(node: &BSTNode) -> i32 {
    match &node.left {
        None => node.value,
        Some(left) => find_min(left), // @step:search-node
    }
}

fn bst_delete(root: Option<Box<BSTNode>>, delete_value: i32) -> Option<Box<BSTNode>> {
    let mut node = match root {
        None => return None, // @step:initialize
        Some(n) => n,
    };

    if delete_value < node.value {
        // Target is in the left subtree
        node.left = bst_delete(node.left.take(), delete_value); // @step:search-node
    } else if delete_value > node.value {
        // Target is in the right subtree
        node.right = bst_delete(node.right.take(), delete_value); // @step:search-node
    } else {
        // Found the node to delete
        if node.left.is_none() {
            return node.right; // @step:delete-child
        }
        if node.right.is_none() {
            return node.left; // @step:delete-child
        }

        // Two children: find inorder successor (smallest in right subtree)
        let successor_value = find_min(node.right.as_ref().unwrap());
        // Replace value with successor's value, then delete the successor
        node.value = successor_value; // @step:delete-child
        node.right = bst_delete(node.right.take(), successor_value);
    }

    Some(node) // @step:complete
}
