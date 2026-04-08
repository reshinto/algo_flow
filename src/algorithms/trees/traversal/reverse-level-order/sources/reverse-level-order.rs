// Reverse Level-Order Traversal — BFS bottom-up: deepest level first

use std::collections::VecDeque;

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn reverse_level_order(root: Option<Box<BSTNode>>) -> Vec<Vec<i32>> {
    let mut result: Vec<Vec<i32>> = Vec::new(); // @step:initialize
    let root = match root {
        None => return result, // @step:initialize
        Some(r) => r,
    };

    let mut queue: VecDeque<Box<BSTNode>> = VecDeque::new(); // @step:initialize
    queue.push_back(root); // @step:initialize

    while !queue.is_empty() {
        // @step:enqueue-node
        let level_size = queue.len(); // @step:enqueue-node
        let mut current_level: Vec<i32> = Vec::new(); // @step:enqueue-node

        for _ in 0..level_size {
            // @step:dequeue-node
            let node = queue.pop_front().unwrap(); // @step:dequeue-node
            current_level.push(node.value); // @step:visit

            if let Some(left) = node.left {
                // @step:enqueue-node
                queue.push_back(left); // @step:enqueue-node
            }
            if let Some(right) = node.right {
                // @step:enqueue-node
                queue.push_back(right); // @step:enqueue-node
            }
        }

        // Prepend level to get bottom-up order
        result.insert(0, current_level); // @step:visit
    }

    result // @step:complete
}
