// BST Kth Smallest (Iterative) — stack-based in-order with counter

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_kth_smallest_iterative(root: &Option<Box<BSTNode>>, kth_position: i32) -> i32 {
    let mut stack: Vec<&BSTNode> = Vec::new(); // @step:initialize
    let mut counter = 0;
    let mut current = root.as_deref();

    loop {
        // Push all left nodes — they have smaller values
        while let Some(node) = current {
            stack.push(node); // @step:search-node
            current = node.left.as_deref();
        }

        if stack.is_empty() {
            break;
        }

        // Process next in-order node
        let node = stack.pop().unwrap();
        counter += 1;

        if counter == kth_position {
            return node.value; // @step:found
        }

        // Move to right subtree
        current = node.right.as_deref(); // @step:search-node
    }

    -1 // @step:complete — k exceeds number of nodes
}
