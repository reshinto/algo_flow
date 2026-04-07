// Flatten Binary Tree to Linked List Iterative — Morris-like: find rightmost of left subtree and rewire

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn flatten_to_linked_list_iterative(root: &mut Option<Box<BinaryNode>>) {
    let mut current_ptr: *mut Option<Box<BinaryNode>> = root;

    loop {
        // @step:visit
        let has_left = unsafe { (*current_ptr).as_ref().map_or(false, |n| n.left.is_some()) };
        if !has_left {
            let has_right = unsafe { (*current_ptr).as_ref().map_or(false, |n| n.right.is_some()) };
            if !has_right {
                break;
            }
            current_ptr = unsafe {
                (*current_ptr).as_mut().map(|n| &mut n.right as *mut Option<Box<BinaryNode>>).unwrap()
            };
            continue;
        }

        // @step:visit
        // Find the rightmost node of the left subtree
        let rightmost_ptr: *mut Option<Box<BinaryNode>> = unsafe {
            let node = (*current_ptr).as_mut().unwrap();
            let mut rightmost = node.left.as_mut().unwrap().as_mut() as *mut BinaryNode; // @step:connect-child
            while (*rightmost).right.is_some() {
                // @step:connect-child
                rightmost = (*rightmost).right.as_mut().unwrap().as_mut() as *mut BinaryNode; // @step:connect-child
            }
            &mut (*rightmost).right as *mut Option<Box<BinaryNode>>
        };

        unsafe {
            let node = (*current_ptr).as_mut().unwrap();
            // Attach original right subtree at the rightmost node
            *rightmost_ptr = node.right.take(); // @step:connect-child
            // Move left subtree to right, clear left pointer
            node.right = node.left.take(); // @step:connect-child
            // left is already None from take() above @step:connect-child
        }

        current_ptr = unsafe {
            (*current_ptr).as_mut().map(|n| &mut n.right as *mut Option<Box<BinaryNode>>).unwrap()
        }; // @step:visit
    }
}
