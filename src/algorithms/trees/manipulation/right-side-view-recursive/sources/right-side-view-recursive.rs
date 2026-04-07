// Right Side View Recursive — DFS: visit right child first, record first node seen at each depth

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn dfs(node: &Option<Box<BinaryNode>>, depth: usize, result: &mut Vec<i32>) {
    match node {
        None => return, // @step:initialize
        Some(current) => {
            // First node encountered at this depth is visible from the right
            if depth == result.len() {
                // @step:visit
                result.push(current.value); // @step:collect-element
            }

            // Visit right child first to ensure rightmost value is recorded first
            dfs(&current.right, depth + 1, result); // @step:traverse-right
            dfs(&current.left, depth + 1, result);  // @step:traverse-left
        }
    }
}

fn right_side_view_recursive(root: &Option<Box<BinaryNode>>) -> Vec<i32> {
    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    dfs(root, 0, &mut result); // @step:initialize
    result // @step:complete
}
