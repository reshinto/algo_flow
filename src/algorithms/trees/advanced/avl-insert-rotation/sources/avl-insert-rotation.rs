// AVL Tree Insertion with Rotations — maintains balance via LL/RR/LR/RL rotations

#[derive(Debug)]
struct AvlNode {
    value: i32,
    height: i32,
    left: Option<Box<AvlNode>>,
    right: Option<Box<AvlNode>>,
}

impl AvlNode {
    fn new(value: i32) -> Self {
        AvlNode { value, height: 1, left: None, right: None }
    }
}

fn node_height(node: &Option<Box<AvlNode>>) -> i32 {
    node.as_ref().map_or(0, |n| n.height) // @step:check-balance
}

fn update_height(node: &mut AvlNode) {
    node.height = 1 + node_height(&node.left).max(node_height(&node.right)); // @step:update-height
}

fn balance_factor(node: &AvlNode) -> i32 {
    node_height(&node.left) - node_height(&node.right) // @step:check-balance
}

fn rotate_right(mut pivot: Box<AvlNode>) -> Box<AvlNode> {
    let mut left_child = pivot.left.take().unwrap(); // @step:rotate-right
    pivot.left = left_child.right.take();
    update_height(&mut pivot);
    left_child.right = Some(pivot);
    update_height(&mut left_child);
    left_child // @step:rotate-right
}

fn rotate_left(mut pivot: Box<AvlNode>) -> Box<AvlNode> {
    let mut right_child = pivot.right.take().unwrap(); // @step:rotate-left
    pivot.right = right_child.left.take();
    update_height(&mut pivot);
    right_child.left = Some(pivot);
    update_height(&mut right_child);
    right_child // @step:rotate-left
}

fn insert(node: Option<Box<AvlNode>>, value: i32) -> Box<AvlNode> {
    let mut node = match node {
        None => return Box::new(AvlNode::new(value)), // @step:insert-node
        Some(n) => n,
    };

    if value < node.value {
        node.left = Some(insert(node.left.take(), value)); // @step:traverse-left
    } else if value > node.value {
        node.right = Some(insert(node.right.take(), value)); // @step:traverse-right
    } else {
        return node; // @step:visit
    }

    update_height(&mut node);
    let balance = balance_factor(&node); // @step:check-balance

    // LL case
    if balance > 1 {
        if let Some(ref left_child) = node.left {
            if value < left_child.value {
                return rotate_right(node); // @step:rotate-right
            }
        }
    }
    // RR case
    if balance < -1 {
        if let Some(ref right_child) = node.right {
            if value > right_child.value {
                return rotate_left(node); // @step:rotate-left
            }
        }
    }
    // LR case
    if balance > 1 {
        node.left = node.left.map(rotate_left); // @step:rotate-left
        return rotate_right(node); // @step:rotate-right
    }
    // RL case
    if balance < -1 {
        node.right = node.right.map(rotate_right); // @step:rotate-right
        return rotate_left(node); // @step:rotate-left
    }

    node
}

fn inorder(node: &Option<Box<AvlNode>>, result: &mut Vec<i32>) {
    if let Some(ref n) = node {
        inorder(&n.left, result);
        result.push(n.value);
        inorder(&n.right, result);
    }
}

fn avl_insert_rotation(values: &[i32]) -> Vec<i32> {
    let mut root: Option<Box<AvlNode>> = None; // @step:initialize

    for &value in values {
        root = Some(insert(root, value)); // @step:insert-node
    }

    let mut result = Vec::new();
    inorder(&root, &mut result);
    result // @step:complete
}
