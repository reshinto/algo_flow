// BST Search (Recursive) — compare target, recurse left or right

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_search(root: &Option<Box<BSTNode>>, target: i32) -> Option<i32> {
    let node = match root {
        None => return None, // @step:initialize
        Some(n) => n,
    };
    if node.value == target {
        return Some(node.value); // @step:found
    }

    if target < node.value {
        // Target is smaller — search the left subtree
        bst_search(&node.left, target) // @step:search-node
    } else {
        // Target is larger — search the right subtree
        bst_search(&node.right, target) // @step:search-node
    }
}
