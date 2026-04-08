// Boundary Traversal — left boundary + leaf nodes + right boundary (counterclockwise)

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn is_leaf(node: &BSTNode) -> bool {
    node.left.is_none() && node.right.is_none()
}

fn add_left_boundary(node: &Option<Box<BSTNode>>, result: &mut Vec<i32>) {
    // @step:traverse-left
    let node = match node {
        None => return, // @step:traverse-left
        Some(n) => n,
    };
    if is_leaf(node) {
        return; // @step:traverse-left
    }
    result.push(node.value); // @step:traverse-left
    if node.left.is_some() {
        // @step:traverse-left
        add_left_boundary(&node.left, result); // @step:traverse-left
    } else {
        // @step:traverse-left
        add_left_boundary(&node.right, result); // @step:traverse-left
    }
}

fn add_leaves(node: &Option<Box<BSTNode>>, result: &mut Vec<i32>) {
    // @step:visit
    let node = match node {
        None => return, // @step:visit
        Some(n) => n,
    };
    if is_leaf(node) {
        // @step:visit
        result.push(node.value); // @step:visit
        return;                  // @step:visit
    }
    add_leaves(&node.left, result);  // @step:visit
    add_leaves(&node.right, result); // @step:visit
}

fn add_right_boundary(node: &Option<Box<BSTNode>>, result: &mut Vec<i32>) {
    // @step:traverse-right
    let node = match node {
        None => return, // @step:traverse-right
        Some(n) => n,
    };
    if is_leaf(node) {
        return; // @step:traverse-right
    }
    if node.right.is_some() {
        // @step:traverse-right
        add_right_boundary(&node.right, result); // @step:traverse-right
    } else {
        // @step:traverse-right
        add_right_boundary(&node.left, result); // @step:traverse-right
    }
    result.push(node.value); // @step:traverse-right (added after recursion for bottom-up)
}

fn boundary_traversal(root: &Option<Box<BSTNode>>) -> Vec<i32> {
    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    let root = match root {
        None => return result, // @step:initialize
        Some(r) => r,
    };

    result.push(root.value); // @step:initialize

    if !is_leaf(root) {
        add_left_boundary(&root.left, &mut result);  // @step:traverse-left
        add_leaves(&root.left, &mut result);          // @step:visit
        add_leaves(&root.right, &mut result);         // @step:visit
        add_right_boundary(&root.right, &mut result); // @step:traverse-right
    }

    result // @step:complete
}
