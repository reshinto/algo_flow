// Lowest Common Ancestor — recursive post-order: for general binary tree (not BST)

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn lowest_common_ancestor(
    root: &Option<Box<BinaryNode>>,
    node_value_a: i32,
    node_value_b: i32,
) -> Option<i32> {
    match root {
        None => None, // @step:initialize
        Some(node) => {
            if node.value == node_value_a || node.value == node_value_b {
                return Some(node.value); // @step:compare
            }

            // Search left and right subtrees
            let left_result = lowest_common_ancestor(&node.left, node_value_a, node_value_b); // @step:traverse-left
            let right_result = lowest_common_ancestor(&node.right, node_value_a, node_value_b); // @step:traverse-right

            // If both sides found a target node, current node is the LCA
            if left_result.is_some() && right_result.is_some() {
                return Some(node.value); // @step:visit
            }

            // Otherwise return whichever side found a target node
            if left_result.is_some() { left_result } else { right_result } // @step:visit
        }
    }
}
