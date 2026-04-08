// BST Insert (Iterative) — track parent, insert at correct leaf position

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

// Iterative BST insert using a recursive approach that mirrors the iterative logic
fn bst_insert_iterative(root: Option<Box<BSTNode>>, insert_value: i32) -> Box<BSTNode> {
    let new_node = Box::new(BSTNode { value: insert_value, left: None, right: None }); // @step:initialize

    let mut root = match root {
        None => return new_node, // @step:insert-child
        Some(r) => r,
    };

    let mut current: *mut BSTNode = &mut *root;

    loop {
        unsafe {
            if insert_value < (*current).value {
                // Go left — if no left child, insert here
                if (*current).left.is_none() {
                    (*current).left = Some(Box::new(BSTNode { value: insert_value, left: None, right: None })); // @step:insert-child
                    break;
                }
                current = &mut **(*current).left.as_mut().unwrap(); // @step:search-node
            } else if insert_value > (*current).value {
                // Go right — if no right child, insert here
                if (*current).right.is_none() {
                    (*current).right = Some(Box::new(BSTNode { value: insert_value, left: None, right: None })); // @step:insert-child
                    break;
                }
                current = &mut **(*current).right.as_mut().unwrap(); // @step:search-node
            } else {
                // Duplicate value — do nothing
                break;
            }
        }
    }

    root // @step:complete
}
