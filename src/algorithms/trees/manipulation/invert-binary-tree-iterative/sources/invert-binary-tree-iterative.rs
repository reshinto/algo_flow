// Invert Binary Tree Iterative — BFS with queue: swap children level by level

use std::collections::VecDeque;

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn invert_binary_tree_iterative(root: Option<Box<BinaryNode>>) -> Option<Box<BinaryNode>> {
    if root.is_none() {
        return None; // @step:initialize
    }

    let mut queue: VecDeque<*mut BinaryNode> = VecDeque::new(); // @step:initialize
    let mut root_box = root;
    queue.push_back(root_box.as_mut().unwrap().as_mut() as *mut BinaryNode);

    while !queue.is_empty() {
        // @step:initialize
        let current_ptr = queue.pop_front().unwrap(); // @step:dequeue

        unsafe {
            // Swap left and right children
            let temp = (*current_ptr).left.take(); // @step:swap-children
            (*current_ptr).left = (*current_ptr).right.take(); // @step:swap-children
            (*current_ptr).right = temp; // @step:swap-children

            // Enqueue non-null children for processing
            if let Some(left) = (*current_ptr).left.as_mut() {
                queue.push_back(left.as_mut() as *mut BinaryNode); // @step:enqueue
            }
            if let Some(right) = (*current_ptr).right.as_mut() {
                queue.push_back(right.as_mut() as *mut BinaryNode); // @step:enqueue
            }
        }
    }

    root_box // @step:complete
}
