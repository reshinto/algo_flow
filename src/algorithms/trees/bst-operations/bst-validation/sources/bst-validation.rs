// BST Validation (Recursive) — validate BST property using min/max bounds

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn validate(node: &Option<Box<BSTNode>>, min_val: i64, max_val: i64) -> bool {
    match node {
        None => true, // @step:initialize
        Some(current) => {
            if (current.value as i64) <= min_val || (current.value as i64) >= max_val {
                // Node value violates BST bounds
                return false; // @step:found
            }

            // Recurse: left subtree values must be less than current node
            // Right subtree values must be greater than current node
            validate(&current.left, min_val, current.value as i64) && // @step:search-node
            validate(&current.right, current.value as i64, max_val) // @step:search-node
        }
    }
}

fn bst_validation(root: &Option<Box<BSTNode>>) -> bool {
    validate(root, i64::MIN, i64::MAX) // @step:complete
}
