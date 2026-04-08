// BST Validation (Iterative) — stack-based in-order traversal checking ascending order

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_validation_iterative(root: Option<Box<BSTNode>>) -> bool {
    let mut stack: Vec<*const BSTNode> = Vec::new(); // @step:initialize
    let mut previous_value = i32::MIN;
    let mut current: *const BSTNode = match &root {
        Some(node) => node.as_ref() as *const BSTNode,
        None => std::ptr::null(),
    };

    loop {
        if current.is_null() && stack.is_empty() {
            break;
        }

        // Push all left nodes onto the stack
        while !current.is_null() {
            stack.push(current); // @step:search-node
            current = unsafe {
                match &(*current).left {
                    Some(left) => left.as_ref() as *const BSTNode,
                    None => std::ptr::null(),
                }
            };
        }

        // Process the top of the stack
        let top = stack.pop().unwrap();
        let node = unsafe { &*top };

        // In-order value must be strictly greater than the previous one
        if node.value <= previous_value {
            return false; // @step:found — BST violation detected
        }

        previous_value = node.value; // @step:search-node
        current = match &node.right {
            Some(right) => right.as_ref() as *const BSTNode,
            None => std::ptr::null(),
        };
    }

    true // @step:complete — all values in ascending order
}
