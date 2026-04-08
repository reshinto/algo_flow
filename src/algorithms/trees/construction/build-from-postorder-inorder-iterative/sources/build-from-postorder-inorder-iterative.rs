// Build Binary Tree from Postorder + Inorder (Iterative with Stack)
// Processes postorder right-to-left; uses inorder (processed right-to-left too)
// to determine when to switch from right-child insertion to left-child insertion.

use std::collections::HashMap;

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn build_from_postorder_inorder_iterative(postorder: &[i32], inorder: &[i32]) -> Option<Box<TreeNode>> {
    if postorder.is_empty() {
        return None; // @step:initialize
    }

    let last_value = *postorder.last()?; // @step:initialize
    let root = Box::new(TreeNode { value: last_value, left: None, right: None }); // @step:build-node

    // Use raw pointers in a vec to simulate the stack
    let root_raw = Box::into_raw(root);
    let mut stack: Vec<*mut TreeNode> = vec![root_raw]; // @step:initialize
    let mut inorder_pointer = inorder.len() as i32 - 1; // @step:initialize

    let postorder_start = postorder.len() as i32 - 2;
    let mut postorder_pointer = postorder_start;

    while postorder_pointer >= 0 {
        // @step:select-element
        let current_value = postorder[postorder_pointer as usize]; // @step:select-element
        postorder_pointer -= 1;

        let new_node = Box::into_raw(Box::new(TreeNode {
            value: current_value,
            left: None,
            right: None,
        })); // @step:build-node

        let parent_ptr = *stack.last().unwrap(); // @step:search-node
        let parent_value = unsafe { (*parent_ptr).value };

        // If stack top differs from current inorder pointer, insert as right child
        if parent_value != inorder[inorder_pointer as usize] {
            unsafe { (*parent_ptr).right = Some(Box::from_raw(new_node)) }; // @step:connect-child
            stack.push(unsafe { (*parent_ptr).right.as_mut().unwrap().as_mut() as *mut TreeNode });
        } else {
            // Pop nodes matching inorder (right-to-left) to find left-child parent
            let mut last_popped = parent_ptr;
            while !stack.is_empty() {
                let top_val = unsafe { (*(*stack.last().unwrap())).value };
                if top_val == inorder[inorder_pointer as usize] {
                    // @step:partition-array
                    last_popped = stack.pop().unwrap(); // @step:partition-array
                    inorder_pointer -= 1; // @step:partition-array
                } else {
                    break;
                }
            }
            unsafe { (*last_popped).left = Some(Box::from_raw(new_node)) }; // @step:connect-child
            stack.push(unsafe { (*last_popped).left.as_mut().unwrap().as_mut() as *mut TreeNode });
        }
    }

    // Return the root node via the saved raw pointer
    unsafe { Some(Box::from_raw(root_raw)) } // @step:visit
}
