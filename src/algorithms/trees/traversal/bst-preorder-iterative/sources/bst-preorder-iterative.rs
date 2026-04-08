// BST Pre-Order Traversal (Iterative) — NLR using an explicit stack

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_preorder_iterative(root: Option<Box<BSTNode>>) -> Vec<i32> {
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

    let mut node_stack: Vec<usize> = vec![0]; // @step:initialize

    while let Some(idx) = node_stack.pop() {
        // @step:initialize
        result.push(flat_nodes[idx].value); // @step:visit

        // Push right first so left is processed first (LIFO)
        if let Some(right_idx) = flat_nodes[idx].right {
            // @step:push-to-stack
            node_stack.push(right_idx); // @step:push-to-stack
        }
        if let Some(left_idx) = flat_nodes[idx].left {
            // @step:traverse-left
            node_stack.push(left_idx); // @step:traverse-left
        }
    }

    result // @step:complete
}
