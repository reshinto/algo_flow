// BST In-Order Traversal — left subtree, visit root, then right subtree

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

    // Recurse into the left subtree first — smaller values come before root
    traverse(&node.left, result); // @step:traverse-left
    // Record the root value — in-order guarantees sorted output for a valid BST
    result.push(node.value); // @step:visit
    // Recurse into the right subtree — larger values come after root
    traverse(&node.right, result); // @step:traverse-right
}

fn bst_inorder(root: Option<Box<BSTNode>>) -> Vec<i32> {
    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    traverse(&root, &mut result);          // @step:initialize
    result                                  // @step:complete
}
