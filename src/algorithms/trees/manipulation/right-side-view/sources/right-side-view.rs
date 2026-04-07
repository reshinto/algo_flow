// Right Side View — BFS: collect the last node of each level

use std::collections::VecDeque;

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn right_side_view(root: Option<Box<BinaryNode>>) -> Vec<i32> {
    if root.is_none() {
        return vec![]; // @step:initialize
    }

    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    let mut queue: VecDeque<*const BinaryNode> = VecDeque::new(); // @step:initialize
    let root_ref = root.as_ref().unwrap().as_ref();
    queue.push_back(root_ref as *const BinaryNode);

    // Keep root alive for the duration
    let _root = root;

    while !queue.is_empty() {
        // @step:visit
        let level_size = queue.len(); // @step:visit

        for position in 0..level_size {
            // @step:visit
            let node_ptr = queue.pop_front().unwrap(); // @step:dequeue

            unsafe {
                let node = &*node_ptr;

                // The last node of this level is visible from the right side
                if position == level_size - 1 {
                    // @step:collect-element
                    result.push(node.value); // @step:collect-element
                }

                if let Some(left) = node.left.as_ref() {
                    queue.push_back(left.as_ref() as *const BinaryNode); // @step:enqueue
                }
                if let Some(right) = node.right.as_ref() {
                    queue.push_back(right.as_ref() as *const BinaryNode); // @step:enqueue
                }
            }
        }
    }

    result // @step:complete
}
