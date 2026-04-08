// All Root-to-Leaf Paths — recursive DFS collecting all paths as strings

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn dfs(node: &Option<Box<TreeNode>>, current_path: &str, paths: &mut Vec<String>) {
    match node {
        None => return, // @step:initialize
        Some(current) => {
            let path_so_far = if current_path.is_empty() {
                current.value.to_string()
            } else {
                format!("{}->{}", current_path, current.value)
            }; // @step:visit

            // Leaf node — record this complete path
            if current.left.is_none() && current.right.is_none() {
                // @step:visit
                paths.push(path_so_far.clone()); // @step:add-to-result
                return;
            }

            dfs(&current.left, &path_so_far, paths);  // @step:traverse-left
            dfs(&current.right, &path_so_far, paths); // @step:traverse-right
        }
    }
}

fn all_root_to_leaf_paths(root: &Option<Box<TreeNode>>) -> Vec<String> {
    let mut paths: Vec<String> = Vec::new(); // @step:initialize
    dfs(root, "", &mut paths); // @step:initialize
    paths // @step:complete
}
