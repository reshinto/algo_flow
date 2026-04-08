// Serialize and Deserialize Binary Tree (BFS / Level-Order)
// Serialization: BFS level-by-level, null nodes represented as "null"
// Deserialization: parse the string back into a tree using a queue

use std::collections::VecDeque;

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn serialize_tree(root: Option<&TreeNode>) -> String {
    match root {
        None => return "null".to_string(), // @step:initialize
        Some(root_node) => {
            let mut queue: VecDeque<Option<&TreeNode>> = VecDeque::new(); // @step:initialize
            let mut parts: Vec<String> = Vec::new(); // @step:initialize
            queue.push_back(Some(root_node));

            while !queue.is_empty() {
                // @step:search-node
                let node = queue.pop_front().unwrap(); // @step:search-node

                match node {
                    None => parts.push("null".to_string()), // @step:visit
                    Some(current) => {
                        parts.push(current.value.to_string()); // @step:visit
                        queue.push_back(current.left.as_deref()); // @step:build-node
                        queue.push_back(current.right.as_deref()); // @step:build-node
                    }
                }
            }

            parts.join(",") // @step:complete
        }
    }
}

fn deserialize_tree(data: &str) -> Option<Box<TreeNode>> {
    if data == "null" || data.is_empty() {
        return None; // @step:initialize
    }

    let parts: Vec<&str> = data.split(',').collect(); // @step:initialize
    let first_value = parts[0]; // @step:select-element
    if first_value == "null" {
        return None;
    }

    let root = Box::new(TreeNode {
        value: first_value.parse().unwrap(),
        left: None,
        right: None,
    }); // @step:build-node
    let mut queue: VecDeque<*mut TreeNode> = VecDeque::new(); // @step:initialize
    let root_ptr = Box::into_raw(root);
    queue.push_back(root_ptr);
    let mut part_index = 1usize; // @step:initialize

    while !queue.is_empty() && part_index < parts.len() {
        // @step:search-node
        let current_ptr = queue.pop_front().unwrap(); // @step:search-node

        let left_value = parts.get(part_index).copied(); // @step:select-element
        part_index += 1; // @step:select-element

        if let Some(left_str) = left_value {
            if left_str != "null" {
                let left_node = Box::into_raw(Box::new(TreeNode {
                    value: left_str.parse().unwrap(),
                    left: None,
                    right: None,
                })); // @step:build-node
                unsafe { (*current_ptr).left = Some(Box::from_raw(left_node)) }; // @step:connect-child
                queue.push_back(left_node); // @step:visit
            }
        }

        let right_value = parts.get(part_index).copied(); // @step:select-element
        part_index += 1; // @step:select-element

        if let Some(right_str) = right_value {
            if right_str != "null" {
                let right_node = Box::into_raw(Box::new(TreeNode {
                    value: right_str.parse().unwrap(),
                    left: None,
                    right: None,
                })); // @step:build-node
                unsafe { (*current_ptr).right = Some(Box::from_raw(right_node)) }; // @step:connect-child
                queue.push_back(right_node); // @step:visit
            }
        }
    }

    unsafe { Some(Box::from_raw(root_ptr)) } // @step:complete
}
