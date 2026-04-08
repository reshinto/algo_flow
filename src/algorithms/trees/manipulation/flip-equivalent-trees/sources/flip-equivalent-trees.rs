// Flip Equivalent Trees — recursive: trees are flip-equivalent if children match or are swapped

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn flip_equivalent_trees(tree_a: &Option<Box<BinaryNode>>, tree_b: &Option<Box<BinaryNode>>) -> bool {
    match (tree_a, tree_b) {
        (None, None) => true,  // @step:initialize
        (None, _) | (_, None) => false, // @step:compare
        (Some(node_a), Some(node_b)) => {
            if node_a.value != node_b.value {
                return false; // @step:compare
            }

            // Check if children match without flipping
            let no_flip = // @step:traverse-left
                flip_equivalent_trees(&node_a.left, &node_b.left) && // @step:traverse-left
                flip_equivalent_trees(&node_a.right, &node_b.right); // @step:traverse-right

            // Check if children match with flipping
            let with_flip = // @step:traverse-left
                flip_equivalent_trees(&node_a.left, &node_b.right) && // @step:traverse-left
                flip_equivalent_trees(&node_a.right, &node_b.left); // @step:traverse-right

            no_flip || with_flip // @step:visit
        }
    }
}
