// BST Insert (Recursive) — find correct leaf position and insert new node

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_insert(root: Option<Box<BSTNode>>, insert_value: i32) -> Box<BSTNode> {
    match root {
        None => {
            // Base case: insert new node at this position
            Box::new(BSTNode { value: insert_value, left: None, right: None }) // @step:insert-child
        }
        Some(mut node) => {
            if insert_value < node.value {
                // Insert value is smaller — recurse into left subtree
                node.left = Some(bst_insert(node.left.take(), insert_value)); // @step:search-node
            } else if insert_value > node.value {
                // Insert value is larger — recurse into right subtree
                node.right = Some(bst_insert(node.right.take(), insert_value)); // @step:search-node
            }
            // Duplicate values are ignored
            node // @step:complete
        }
    }
}
