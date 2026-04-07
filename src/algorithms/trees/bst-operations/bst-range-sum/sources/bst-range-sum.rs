// BST Range Sum (Recursive) — sum all nodes with values in [low_value, high_value]

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_range_sum(root: &Option<Box<BSTNode>>, low_value: i32, high_value: i32) -> i32 {
    let node = match root {
        None => return 0, // @step:initialize
        Some(n) => n,
    };

    let mut sum = 0;

    if node.value >= low_value && node.value <= high_value {
        // Current node is in range — add its value
        sum += node.value; // @step:found
    }

    if node.value > low_value {
        // Left subtree may contain values in range
        sum += bst_range_sum(&node.left, low_value, high_value); // @step:search-node
    }

    if node.value < high_value {
        // Right subtree may contain values in range
        sum += bst_range_sum(&node.right, low_value, high_value); // @step:search-node
    }

    sum // @step:complete
}
