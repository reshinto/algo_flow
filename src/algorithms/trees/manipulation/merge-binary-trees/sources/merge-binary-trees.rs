// Merge Binary Trees — recursive: if both nodes exist, sum values; otherwise take non-null node

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn merge_binary_trees(
    tree_a: Option<Box<BinaryNode>>,
    tree_b: Option<Box<BinaryNode>>,
) -> Option<Box<BinaryNode>> {
    match (tree_a, tree_b) {
        (None, tree_b) => tree_b, // @step:initialize
        (tree_a, None) => tree_a, // @step:initialize
        (Some(mut node_a), Some(node_b)) => {
            // Both nodes exist — merge by summing values
            node_a.value += node_b.value; // @step:merge-node

            // Recursively merge left and right subtrees
            node_a.left = merge_binary_trees(node_a.left, node_b.left); // @step:traverse-left
            node_a.right = merge_binary_trees(node_a.right, node_b.right); // @step:traverse-right

            Some(node_a) // @step:visit
        }
    }
}
