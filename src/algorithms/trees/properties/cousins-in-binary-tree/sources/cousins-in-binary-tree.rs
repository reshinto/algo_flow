// Cousins in Binary Tree — BFS: check if two nodes are at same depth with different parents

use std::collections::VecDeque;

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn cousins_in_binary_tree(root: &Option<Box<TreeNode>>, node_value_a: i32, node_value_b: i32) -> bool {
    if root.is_none() {
        return false; // @step:initialize
    }

    let root_node = root.as_ref().unwrap();
    // queue entries: (node_ptr, parent_ptr, depth)
    let mut queue: VecDeque<(*const TreeNode, *const TreeNode, i32)> = VecDeque::new(); // @step:initialize
    queue.push_back((root_node.as_ref() as *const TreeNode, std::ptr::null(), 0));

    let mut parent_a: *const TreeNode = std::ptr::null(); // @step:initialize
    let mut parent_b: *const TreeNode = std::ptr::null(); // @step:initialize
    let mut depth_a: i32 = -1; // @step:initialize
    let mut depth_b: i32 = -1; // @step:initialize

    while !queue.is_empty() {
        // @step:visit
        let (current_ptr, parent_ptr, current_depth) = queue.pop_front().unwrap(); // @step:visit

        unsafe {
            let current = &*current_ptr;

            if current.value == node_value_a {
                // @step:check-balance
                parent_a = parent_ptr; // @step:check-balance
                depth_a = current_depth; // @step:update-height
            }

            if current.value == node_value_b {
                // @step:check-balance
                parent_b = parent_ptr; // @step:check-balance
                depth_b = current_depth; // @step:update-height
            }

            if let Some(left) = current.left.as_ref() {
                queue.push_back((left.as_ref() as *const TreeNode, current_ptr, current_depth + 1)); // @step:traverse-left
            }
            if let Some(right) = current.right.as_ref() {
                queue.push_back((right.as_ref() as *const TreeNode, current_ptr, current_depth + 1)); // @step:traverse-right
            }
        }
    }

    // Cousins: same depth, different parents
    depth_a == depth_b && parent_a != parent_b // @step:complete
}
