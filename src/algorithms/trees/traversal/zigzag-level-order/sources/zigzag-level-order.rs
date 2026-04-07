// Zigzag Level-Order Traversal — BFS with alternating left-right direction per level

use std::collections::VecDeque;

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn zigzag_level_order(root: Option<Box<BSTNode>>) -> Vec<Vec<i32>> {
    let mut result: Vec<Vec<i32>> = Vec::new(); // @step:initialize
    let root = match root {
        None => return result, // @step:initialize
        Some(r) => r,
    };

    let mut queue: VecDeque<Box<BSTNode>> = VecDeque::new(); // @step:initialize
    queue.push_back(root); // @step:initialize
    let mut left_to_right = true; // @step:initialize

    while !queue.is_empty() {
        // @step:enqueue-node
        let level_size = queue.len(); // @step:enqueue-node
        let mut current_level: Vec<i32> = vec![0; level_size]; // @step:enqueue-node

        for node_index in 0..level_size {
            // @step:dequeue-node
            let node = queue.pop_front().unwrap(); // @step:dequeue-node

            // Insert at front or back based on current direction
            let insert_index = if left_to_right { node_index } else { level_size - 1 - node_index }; // @step:visit
            current_level[insert_index] = node.value; // @step:visit

            if let Some(left) = node.left {
                // @step:enqueue-node
                queue.push_back(left); // @step:enqueue-node
            }
            if let Some(right) = node.right {
                // @step:enqueue-node
                queue.push_back(right); // @step:enqueue-node
            }
        }

        result.push(current_level); // @step:visit
        left_to_right = !left_to_right; // @step:visit
    }

    result // @step:complete
}
