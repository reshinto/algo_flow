// BST Pre-Order Traversal — visit root, then left subtree, then right subtree (NLR)

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

    // Visit the current node first — root before any subtrees
    result.push(node.value); // @step:visit
    // Recurse into the left subtree
    traverse(&node.left, result); // @step:traverse-left
    // Recurse into the right subtree
    traverse(&node.right, result); // @step:traverse-right
}

fn bst_preorder(root: Option<Box<BSTNode>>) -> Vec<i32> {
    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    traverse(&root, &mut result);          // @step:initialize
    result                                  // @step:complete
}
