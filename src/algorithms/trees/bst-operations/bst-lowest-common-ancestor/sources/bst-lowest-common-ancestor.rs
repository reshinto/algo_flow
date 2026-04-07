// BST Lowest Common Ancestor (Recursive) — use BST property to find split point

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_lowest_common_ancestor(
    root: &Option<Box<BSTNode>>,
    node_value_a: i32,
    node_value_b: i32,
) -> Option<i32> {
    let node = match root {
        None => return None, // @step:initialize
        Some(n) => n,
    };

    if node_value_a < node.value && node_value_b < node.value {
        // Both values are smaller — LCA must be in the left subtree
        return bst_lowest_common_ancestor(&node.left, node_value_a, node_value_b); // @step:search-node
    }

    if node_value_a > node.value && node_value_b > node.value {
        // Both values are larger — LCA must be in the right subtree
        return bst_lowest_common_ancestor(&node.right, node_value_a, node_value_b); // @step:search-node
    }

    // Values split across root (or one equals root) — current node is the LCA
    Some(node.value) // @step:found
}
