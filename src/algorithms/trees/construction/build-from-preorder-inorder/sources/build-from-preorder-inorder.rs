// Build Binary Tree from Preorder + Inorder Traversal (Recursive)
// First element of preorder is root; find root in inorder to split left/right subtrees

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn build_from_preorder_inorder(preorder: &[i32], inorder: &[i32]) -> Option<Box<TreeNode>> {
    if preorder.is_empty() || inorder.is_empty() {
        return None; // @step:initialize
    }

    let root_value = preorder[0]; // @step:select-element
    let mut root = Box::new(TreeNode { value: root_value, left: None, right: None }); // @step:build-node

    let inorder_root_index = inorder.iter().position(|&val| val == root_value)?; // @step:partition-array

    // Left subtree uses inorder[0..inorderRootIndex-1] and corresponding preorder slice
    let left_inorder = &inorder[..inorder_root_index]; // @step:partition-array
    let left_preorder = &preorder[1..1 + left_inorder.len()]; // @step:partition-array

    // Right subtree uses inorder[inorderRootIndex+1..] and the remaining preorder elements
    let right_inorder = &inorder[inorder_root_index + 1..]; // @step:partition-array
    let right_preorder = &preorder[1 + left_inorder.len()..]; // @step:partition-array

    root.left = build_from_preorder_inorder(left_preorder, left_inorder); // @step:connect-child
    root.right = build_from_preorder_inorder(right_preorder, right_inorder); // @step:connect-child

    Some(root) // @step:visit
}
