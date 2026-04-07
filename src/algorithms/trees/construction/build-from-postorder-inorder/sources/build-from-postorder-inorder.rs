// Build Binary Tree from Postorder + Inorder Traversal (Recursive)
// Last element of postorder is root; find root in inorder to split left/right subtrees

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn build_from_postorder_inorder(postorder: &[i32], inorder: &[i32]) -> Option<Box<TreeNode>> {
    if postorder.is_empty() || inorder.is_empty() {
        return None; // @step:initialize
    }

    let root_value = *postorder.last()?; // @step:select-element
    let mut root = Box::new(TreeNode { value: root_value, left: None, right: None }); // @step:build-node

    let inorder_root_index = inorder.iter().position(|&val| val == root_value)?; // @step:partition-array

    // Split inorder and postorder into left/right subtrees
    let left_inorder = &inorder[..inorder_root_index]; // @step:partition-array
    let right_inorder = &inorder[inorder_root_index + 1..]; // @step:partition-array

    let left_postorder = &postorder[..left_inorder.len()]; // @step:partition-array
    let right_postorder = &postorder[left_inorder.len()..postorder.len() - 1]; // @step:partition-array

    root.left = build_from_postorder_inorder(left_postorder, left_inorder); // @step:connect-child
    root.right = build_from_postorder_inorder(right_postorder, right_inorder); // @step:connect-child

    Some(root) // @step:visit
}
