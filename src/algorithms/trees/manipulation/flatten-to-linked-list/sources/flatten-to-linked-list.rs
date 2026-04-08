// Flatten Binary Tree to Linked List — recursive preorder: rewire nodes in-place

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn flatten_to_linked_list(root: &mut Option<Box<BinaryNode>>) {
    if root.is_none() {
        return; // @step:initialize
    }

    let node = root.as_mut().unwrap();

    // Recursively flatten the left and right subtrees
    flatten_to_linked_list(&mut node.left);   // @step:traverse-left
    flatten_to_linked_list(&mut node.right);  // @step:traverse-right

    // Save the original right subtree
    let right_subtree = node.right.take(); // @step:connect-child

    // Move the left subtree to the right
    node.right = node.left.take(); // @step:connect-child
    // left is now None (already cleared by take()) @step:connect-child

    // Find the rightmost node of the newly-placed subtree
    let mut current_ptr: *mut BinaryNode = node.as_mut();
    unsafe {
        while (*current_ptr).right.is_some() {
            // @step:visit
            current_ptr = (*current_ptr).right.as_mut().unwrap().as_mut() as *mut BinaryNode; // @step:visit
        }
        // Attach the original right subtree at the tail
        (*current_ptr).right = right_subtree; // @step:connect-child
    }
}
