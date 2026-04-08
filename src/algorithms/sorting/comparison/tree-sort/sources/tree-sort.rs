// Tree Sort — insert all elements into a Binary Search Tree, then extract via inorder traversal
struct BstNode {
    value: i64,
    left: Option<Box<BstNode>>,
    right: Option<Box<BstNode>>,
}

fn create_node(value: i64) -> Box<BstNode> {
    Box::new(BstNode { value, left: None, right: None })
}

fn insert_node(root: Option<Box<BstNode>>, value: i64) -> Box<BstNode> {
    // @step:insert
    match root {
        None => create_node(value), // @step:insert
        Some(mut node) => {
            if value < node.value {
                // @step:compare
                node.left = Some(insert_node(node.left, value)); // @step:insert
            } else {
                node.right = Some(insert_node(node.right, value)); // @step:insert
            }
            node // @step:insert
        }
    }
}

fn inorder_traversal(root: &Option<Box<BstNode>>, result: &mut Vec<i64>) {
    // @step:extract
    if let Some(node) = root {
        inorder_traversal(&node.left, result); // @step:extract
        result.push(node.value); // @step:mark-sorted
        inorder_traversal(&node.right, result); // @step:extract
    } // @step:extract
}

fn tree_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let array_length = input_array.len(); // @step:initialize

    if array_length == 0 {
        return vec![]; // @step:complete
    }

    let mut tree_root: Option<Box<BstNode>> = None; // @step:initialize

    // Insert each element into the BST
    for insert_index in 0..array_length {
        // @step:insert
        tree_root = Some(insert_node(tree_root, input_array[insert_index])); // @step:insert
    }

    // Extract sorted order via inorder traversal
    let mut sorted_array: Vec<i64> = Vec::new(); // @step:extract
    inorder_traversal(&tree_root, &mut sorted_array); // @step:extract

    // @step:mark-sorted
    sorted_array // @step:complete
}
