// Same Tree — recursive: check structural equality and value equality

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn same_tree(tree_a: &Option<Box<BinaryNode>>, tree_b: &Option<Box<BinaryNode>>) -> bool {
    match (tree_a, tree_b) {
        (None, None) => true, // @step:initialize
        (None, _) | (_, None) => false, // @step:compare
        (Some(node_a), Some(node_b)) => {
            if node_a.value != node_b.value {
                return false; // @step:compare
            }

            // Recursively check left and right subtrees
            let left_match = same_tree(&node_a.left, &node_b.left); // @step:traverse-left
            let right_match = same_tree(&node_a.right, &node_b.right); // @step:traverse-right

            left_match && right_match // @step:visit
        }
    }
}
