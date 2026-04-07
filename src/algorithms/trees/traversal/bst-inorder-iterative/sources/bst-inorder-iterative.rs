// BST In-Order Traversal (Iterative) — LNR using an explicit stack

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn bst_inorder_iterative(root: Option<Box<BSTNode>>) -> Vec<i32> {
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
    let mut node_stack: Vec<usize> = Vec::new(); // @step:initialize
    let mut current: Option<usize> = if flat_nodes.is_empty() { None } else { Some(0) }; // @step:initialize

    while current.is_some() || !node_stack.is_empty() {
        // @step:initialize
        // Push all left children onto the stack
        while let Some(idx) = current {
            // @step:push-to-stack
            node_stack.push(idx); // @step:push-to-stack
            current = flat_nodes[idx].left; // @step:traverse-left
        }

        // Pop the top node and visit it
        let idx = node_stack.pop().unwrap(); // @step:pop-from-stack
        result.push(flat_nodes[idx].value); // @step:visit

        // Move to right subtree
        current = flat_nodes[idx].right; // @step:traverse-right
    }

    result // @step:complete
}
