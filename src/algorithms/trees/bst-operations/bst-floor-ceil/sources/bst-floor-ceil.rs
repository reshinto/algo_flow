// BST Floor & Ceil (Recursive) — largest value ≤ target (floor), smallest value ≥ target (ceil)

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

struct FloorCeilResult {
    floor: Option<i32>,
    ceil: Option<i32>,
}

fn find_floor(node: &Option<Box<BSTNode>>, target: i32) -> Option<i32> {
    let node = match node {
        None => return None, // @step:initialize
        Some(n) => n,
    };
    if node.value == target {
        return Some(node.value); // @step:found
    }
    if target < node.value {
        // Target smaller than node — floor must be in left subtree
        return find_floor(&node.left, target); // @step:search-node
    }
    // Target larger than node — this node is a candidate, check right
    let right_floor = find_floor(&node.right, target); // @step:search-node
    if right_floor.is_some() { right_floor } else { Some(node.value) } // @step:complete
}

fn find_ceil(node: &Option<Box<BSTNode>>, target: i32) -> Option<i32> {
    let node = match node {
        None => return None, // @step:initialize
        Some(n) => n,
    };
    if node.value == target {
        return Some(node.value); // @step:found
    }
    if target > node.value {
        // Target larger than node — ceil must be in right subtree
        return find_ceil(&node.right, target); // @step:search-node
    }
    // Target smaller than node — this node is a candidate, check left
    let left_ceil = find_ceil(&node.left, target); // @step:search-node
    if left_ceil.is_some() { left_ceil } else { Some(node.value) } // @step:complete
}

fn bst_floor_ceil(root: &Option<Box<BSTNode>>, target: i32) -> FloorCeilResult {
    FloorCeilResult {
        floor: find_floor(root, target),
        ceil: find_ceil(root, target),
    }
}
