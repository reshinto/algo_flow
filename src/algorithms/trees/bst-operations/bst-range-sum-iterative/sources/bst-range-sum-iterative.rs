// BST Range Sum (Iterative) — stack-based DFS summing nodes in [low_value, high_value]

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_range_sum_iterative(root: &Option<Box<BSTNode>>, low_value: i32, high_value: i32) -> i32 {
    let root_node = match root {
        None => return 0, // @step:initialize
        Some(n) => n.as_ref(),
    };

    let mut stack: Vec<&BSTNode> = vec![root_node];
    let mut total_sum = 0;

    while let Some(node) = stack.pop() {
        if node.value >= low_value && node.value <= high_value {
            // Node is in range — add to sum
            total_sum += node.value; // @step:found
        }

        if let Some(ref left) = node.left {
            if node.value > low_value {
                // Left child exists and may have values in range
                stack.push(left); // @step:search-node
            }
        }

        if let Some(ref right) = node.right {
            if node.value < high_value {
                // Right child exists and may have values in range
                stack.push(right); // @step:search-node
            }
        }
    }

    total_sum // @step:complete
}
