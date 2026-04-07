// BST Lowest Common Ancestor (Iterative) — while loop split point search

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_lowest_common_ancestor_iterative(
    root: &Option<Box<BSTNode>>,
    node_value_a: i32,
    node_value_b: i32,
) -> Option<i32> {
    let mut current = root.as_deref(); // @step:initialize

    while let Some(node) = current {
        if node_value_a < node.value && node_value_b < node.value {
            // Both values are smaller — move to left subtree
            current = node.left.as_deref(); // @step:search-node
        } else if node_value_a > node.value && node_value_b > node.value {
            // Both values are larger — move to right subtree
            current = node.right.as_deref(); // @step:search-node
        } else {
            // Values split across current (or one equals current) — found LCA
            return Some(node.value); // @step:found
        }
    }

    None // @step:complete
}
