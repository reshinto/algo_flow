// All Root-to-Leaf Paths (Iterative) — stack-based with path tracking

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn all_root_to_leaf_paths_iterative(root: &Option<Box<TreeNode>>) -> Vec<String> {
    if root.is_none() {
        return vec![]; // @step:initialize
    }

    let mut paths: Vec<String> = Vec::new(); // @step:initialize
    let root_node = root.as_ref().unwrap();
    let mut stack: Vec<(*const TreeNode, String)> = vec![ // @step:initialize
        (root_node.as_ref() as *const TreeNode, root_node.value.to_string()),
    ];

    while !stack.is_empty() {
        // @step:visit
        let (current_ptr, path_so_far) = stack.pop().unwrap(); // @step:visit

        unsafe {
            let current = &*current_ptr;

            // Leaf node — record complete path
            if current.left.is_none() && current.right.is_none() {
                // @step:check-balance
                paths.push(path_so_far.clone()); // @step:add-to-result
            }

            if let Some(right) = current.right.as_ref() {
                // @step:traverse-right
                let new_path = format!("{}->{}", path_so_far, right.value);
                stack.push((right.as_ref() as *const TreeNode, new_path)); // @step:traverse-right
            }

            if let Some(left) = current.left.as_ref() {
                // @step:traverse-left
                let new_path = format!("{}->{}", path_so_far, left.value);
                stack.push((left.as_ref() as *const TreeNode, new_path)); // @step:traverse-left
            }
        }
    }

    paths // @step:complete
}
