// BST Post-Order Traversal — left subtree, right subtree, visit root (LRN)

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn traverse(node: &Option<Box<BSTNode>>, result: &mut Vec<i32>) {
    let node = match node {
        None => return, // @step:initialize
        Some(n) => n,
    };

    // Recurse into the left subtree first
    traverse(&node.left, result); // @step:traverse-left
    // Recurse into the right subtree
    traverse(&node.right, result); // @step:traverse-right
    // Visit the root last — after both children have been processed
    result.push(node.value); // @step:visit
}

fn bst_postorder(root: Option<Box<BSTNode>>) -> Vec<i32> {
    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    traverse(&root, &mut result);          // @step:initialize
    result                                  // @step:complete
}
