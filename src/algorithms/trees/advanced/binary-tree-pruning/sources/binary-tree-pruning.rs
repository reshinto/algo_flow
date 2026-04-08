// Binary Tree Pruning — remove all subtrees containing no 1s (post-order)

#[derive(Debug)]
struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn binary_tree_pruning(root: Option<Box<BinaryNode>>) -> Option<Box<BinaryNode>> {
    let mut node = root?; // @step:initialize

    // Post-order: prune children first, then decide current node
    node.left = binary_tree_pruning(node.left.take()); // @step:traverse-left
    node.right = binary_tree_pruning(node.right.take()); // @step:traverse-right

    // If this leaf has value 0, prune it
    if node.value == 0 && node.left.is_none() && node.right.is_none() {
        return None; // @step:detach-node
    }

    Some(node) // @step:visit
}
