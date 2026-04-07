// Invert Binary Tree — recursive: swap left and right children at every node

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn invert_binary_tree(root: Option<Box<BinaryNode>>) -> Option<Box<BinaryNode>> {
    match root {
        None => None, // @step:initialize
        Some(mut node) => {
            // Recursively invert the left subtree
            let inverted_left = invert_binary_tree(node.left.take()); // @step:traverse-left
            // Recursively invert the right subtree
            let inverted_right = invert_binary_tree(node.right.take()); // @step:traverse-right

            // Swap left and right children
            node.left = inverted_right; // @step:swap-children
            node.right = inverted_left; // @step:swap-children

            Some(node) // @step:visit
        }
    }
}
