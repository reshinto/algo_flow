// BST Floor & Ceil (Iterative) — while loop, track best floor/ceil candidates

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

struct FloorCeilResult {
    floor: Option<i32>,
    ceil: Option<i32>,
}

fn bst_floor_ceil_iterative(root: &Option<Box<BSTNode>>, target: i32) -> FloorCeilResult {
    let mut floor_value: Option<i32> = None; // @step:initialize
    let mut ceil_value: Option<i32> = None;
    let mut current = root.as_deref();

    while let Some(node) = current {
        if node.value == target {
            // Exact match is both floor and ceil
            return FloorCeilResult { floor: Some(node.value), ceil: Some(node.value) }; // @step:found
        }

        if target < node.value {
            // Current node is a ceil candidate — go left for smaller ceil
            ceil_value = Some(node.value); // @step:search-node
            current = node.left.as_deref();
        } else {
            // Current node is a floor candidate — go right for larger floor
            floor_value = Some(node.value); // @step:search-node
            current = node.right.as_deref();
        }
    }

    FloorCeilResult { floor: floor_value, ceil: ceil_value } // @step:complete
}
