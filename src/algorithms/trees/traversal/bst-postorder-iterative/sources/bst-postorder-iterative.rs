// BST Post-Order Traversal (Iterative) — LRN using two stacks

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_postorder_iterative(root: Option<Box<BSTNode>>) -> Vec<i32> {
    // Flatten tree into indexed nodes for pointer-free iterative traversal
    struct FlatNode {
        value: i32,
        left: Option<usize>,
        right: Option<usize>,
    }

    let mut flat_nodes: Vec<FlatNode> = Vec::new(); // @step:initialize

    fn flatten(node: Option<Box<BSTNode>>, nodes: &mut Vec<FlatNode>) -> Option<usize> {
        let node = node?;
        let index = nodes.len();
        nodes.push(FlatNode { value: node.value, left: None, right: None });
        let left_index = flatten(node.left, nodes);
        let right_index = flatten(node.right, nodes);
        nodes[index].left = left_index;
        nodes[index].right = right_index;
        Some(index)
    }

    flatten(root, &mut flat_nodes);

    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    if flat_nodes.is_empty() {
        return result; // @step:initialize
    }

    let mut stack1: Vec<usize> = vec![0]; // @step:initialize
    let mut stack2: Vec<usize> = Vec::new(); // @step:initialize

    // Phase 1: push nodes onto stack2 in reverse post-order
    while let Some(idx) = stack1.pop() {
        // @step:push-to-stack
        stack2.push(idx); // @step:push-to-stack

        if let Some(left_idx) = flat_nodes[idx].left {
            // @step:traverse-left
            stack1.push(left_idx); // @step:traverse-left
        }
        if let Some(right_idx) = flat_nodes[idx].right {
            // @step:traverse-right
            stack1.push(right_idx); // @step:traverse-right
        }
    }

    // Phase 2: pop stack2 in post-order and visit each node
    while let Some(idx) = stack2.pop() {
        // @step:visit
        result.push(flat_nodes[idx].value); // @step:visit
    }

    result // @step:complete
}
