// Subtree of Another Tree — recursive: for each node in main tree, check if subtree matches

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn is_same_tree(tree_a: &Option<Box<BinaryNode>>, tree_b: &Option<Box<BinaryNode>>) -> bool {
    match (tree_a, tree_b) {
        (None, None) => true,
        (None, _) | (_, None) => false,
        (Some(a), Some(b)) => {
            if a.value != b.value {
                return false;
            }
            is_same_tree(&a.left, &b.left) && is_same_tree(&a.right, &b.right)
        }
    }
}

fn subtree_of_another_tree(main_tree: &Option<Box<BinaryNode>>, sub_tree: &Option<Box<BinaryNode>>) -> bool {
    if sub_tree.is_none() {
        return true; // @step:initialize
    }
    if main_tree.is_none() {
        return false; // @step:initialize
    }

    // Check if the tree rooted at mainTree matches subTree
    if is_same_tree(main_tree, sub_tree) {
        return true; // @step:compare
    }

    // Recursively check left and right subtrees
    let main_node = main_tree.as_ref().unwrap();
    subtree_of_another_tree(&main_node.left, sub_tree) || // @step:traverse-left
    subtree_of_another_tree(&main_node.right, sub_tree)   // @step:traverse-right
}
