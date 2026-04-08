// Build Binary Tree from Preorder + Inorder (Iterative with Stack)
// Uses a stack to simulate recursion — push nodes as we consume preorder values,
// pop when we detect a boundary via the inorder pointer.

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn build_from_preorder_inorder_iterative(preorder: &[i32], inorder: &[i32]) -> Option<Box<TreeNode>> {
    if preorder.is_empty() {
        return None; // @step:initialize
    }

    let first_value = preorder[0]; // @step:initialize
    let root = Box::new(TreeNode { value: first_value, left: None, right: None }); // @step:build-node

    let root_raw = Box::into_raw(root);
    let mut stack: Vec<*mut TreeNode> = vec![root_raw]; // @step:initialize
    let mut inorder_pointer: usize = 0; // @step:initialize

    for preorder_pointer in 1..preorder.len() {
        // @step:select-element
        let current_value = preorder[preorder_pointer]; // @step:select-element

        let new_node = Box::into_raw(Box::new(TreeNode {
            value: current_value,
            left: None,
            right: None,
        })); // @step:build-node

        let parent_ptr = *stack.last().unwrap(); // @step:search-node
        let parent_value = unsafe { (*parent_ptr).value };

        // If stack top differs from current inorder value, go left
        if parent_value != inorder[inorder_pointer] {
            unsafe { (*parent_ptr).left = Some(Box::from_raw(new_node)) }; // @step:connect-child
            stack.push(unsafe { (*parent_ptr).left.as_mut().unwrap().as_mut() as *mut TreeNode });
        } else {
            // Pop nodes that match inorder to find the parent for right insertion
            let mut last_popped = parent_ptr;
            while !stack.is_empty() {
                let top_val = unsafe { (*(*stack.last().unwrap())).value };
                if top_val == inorder[inorder_pointer] {
                    // @step:partition-array
                    last_popped = stack.pop().unwrap(); // @step:partition-array
                    inorder_pointer += 1; // @step:partition-array
                } else {
                    break;
                }
            }
            unsafe { (*last_popped).right = Some(Box::from_raw(new_node)) }; // @step:connect-child
            stack.push(unsafe { (*last_popped).right.as_mut().unwrap().as_mut() as *mut TreeNode });
        }
    }

    // Return the root via the saved raw pointer
    unsafe { Some(Box::from_raw(root_raw)) } // @step:visit
}
