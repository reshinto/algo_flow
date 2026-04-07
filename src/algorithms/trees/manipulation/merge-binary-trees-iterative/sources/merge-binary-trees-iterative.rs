// Merge Binary Trees Iterative — stack-based pair comparison and merge

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn merge_binary_trees_iterative(
    tree_a: Option<Box<BinaryNode>>,
    tree_b: Option<Box<BinaryNode>>,
) -> Option<Box<BinaryNode>> {
    if tree_a.is_none() {
        return tree_b; // @step:initialize
    }

    let mut tree_a = tree_a;
    let mut stack: Vec<(*mut BinaryNode, *mut BinaryNode)> = Vec::new(); // @step:initialize

    if tree_b.is_some() {
        // @step:initialize
        let node_a_ptr = tree_a.as_mut().unwrap().as_mut() as *mut BinaryNode;
        let mut tree_b_box = tree_b.unwrap();
        let node_b_ptr = tree_b_box.as_mut() as *mut BinaryNode;
        std::mem::forget(tree_b_box);
        stack.push((node_a_ptr, node_b_ptr)); // @step:initialize
    }

    while !stack.is_empty() {
        // @step:visit
        let (ptr_a, ptr_b) = stack.pop().unwrap(); // @step:visit

        unsafe {
            let node_a = &mut *ptr_a;
            let node_b = &mut *ptr_b;

            // Merge values
            node_a.value += node_b.value; // @step:merge-node

            // Handle right children
            match (&mut node_a.right, &mut node_b.right) {
                (right_a, right_b) if right_a.is_none() => {
                    // @step:connect-child
                    *right_a = right_b.take(); // @step:connect-child
                }
                (Some(ra), Some(rb)) => {
                    // @step:connect-child
                    stack.push((ra.as_mut() as *mut BinaryNode, rb.as_mut() as *mut BinaryNode)); // @step:enqueue
                }
                _ => {}
            }

            // Handle left children
            match (&mut node_a.left, &mut node_b.left) {
                (left_a, left_b) if left_a.is_none() => {
                    // @step:connect-child
                    *left_a = left_b.take(); // @step:connect-child
                }
                (Some(la), Some(lb)) => {
                    // @step:connect-child
                    stack.push((la.as_mut() as *mut BinaryNode, lb.as_mut() as *mut BinaryNode)); // @step:enqueue
                }
                _ => {}
            }
        }
    }

    tree_a // @step:complete
}
