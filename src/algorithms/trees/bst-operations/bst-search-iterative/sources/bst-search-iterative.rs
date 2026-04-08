// BST Search (Iterative) — while loop binary search, no recursion

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_search_iterative(root: &Option<Box<BSTNode>>, target: i32) -> Option<i32> {
    let mut current = root.as_deref(); // @step:initialize

    while let Some(node) = current {
        if node.value == target {
            return Some(node.value); // @step:found
        }

        if target < node.value {
            // Target is smaller — move left
            current = node.left.as_deref(); // @step:search-node
        } else {
            // Target is larger — move right
            current = node.right.as_deref(); // @step:search-node
        }
    }

    None // @step:complete
}
