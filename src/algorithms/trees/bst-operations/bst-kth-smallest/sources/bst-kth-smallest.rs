// BST Kth Smallest (Recursive) — in-order traversal with counter, stop at k

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn inorder_kth(node: &Option<Box<BSTNode>>, kth_position: i32, counter: &mut i32, result: &mut i32) {
    let node = match node {
        None => return,
        Some(n) => n,
    };
    if *counter >= kth_position {
        return; // @step:initialize
    }

    // Visit left subtree first (smaller values)
    inorder_kth(&node.left, kth_position, counter, result); // @step:search-node

    // Visit current node — increment counter
    *counter += 1;
    if *counter == kth_position {
        *result = node.value; // @step:found
        return;
    }

    // Visit right subtree (larger values)
    inorder_kth(&node.right, kth_position, counter, result); // @step:search-node
}

fn bst_kth_smallest(root: &Option<Box<BSTNode>>, kth_position: i32) -> i32 {
    let mut counter = 0; // @step:initialize
    let mut result = -1;

    inorder_kth(root, kth_position, &mut counter, &mut result);
    result // @step:complete
}
