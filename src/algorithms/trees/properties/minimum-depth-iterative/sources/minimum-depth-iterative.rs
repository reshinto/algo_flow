// Minimum Depth of Binary Tree — BFS returns depth at first leaf encountered

use std::collections::VecDeque;

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn minimum_depth_iterative(root: Option<Box<TreeNode>>) -> i32 {
    let root = match root {
        None => return 0, // @step:initialize
        Some(r) => r,
    };

    let mut queue: VecDeque<Box<TreeNode>> = VecDeque::new(); // @step:initialize
    queue.push_back(root); // @step:initialize
    let mut depth = 0; // @step:initialize

    while !queue.is_empty() {
        // @step:visit
        let level_size = queue.len(); // @step:visit
        depth += 1;                   // @step:update-height

        for _ in 0..level_size {
            // @step:visit
            let current = queue.pop_front().unwrap(); // @step:visit

            // First leaf node encountered is the minimum depth
            if current.left.is_none() && current.right.is_none() {
                // @step:visit
                return depth; // @step:complete
            }

            if let Some(left) = current.left {
                queue.push_back(left); // @step:traverse-left
            }
            if let Some(right) = current.right {
                queue.push_back(right); // @step:traverse-right
            }
        }
    }

    depth // @step:complete
}
