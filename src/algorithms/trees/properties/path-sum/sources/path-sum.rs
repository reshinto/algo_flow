// Path Sum — recursive DFS: check if any root-to-leaf path sums to target

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn path_sum(root: Option<Box<TreeNode>>, target_sum: i32) -> bool {
    let root = match root {
        None => return false, // @step:initialize
        Some(r) => r,
    };

    // Leaf node — check if remaining sum equals node value
    if root.left.is_none() && root.right.is_none() {
        // @step:visit
        return root.value == target_sum; // @step:check-balance
    }

    let remaining = target_sum - root.value; // @step:compute-value

    // Recurse on left and right subtrees
    let found_left = path_sum(root.left, remaining); // @step:traverse-left
    if found_left {
        return true; // @step:check-balance
    }

    let found_right = path_sum(root.right, remaining); // @step:traverse-right
    found_right                                         // @step:complete
}
