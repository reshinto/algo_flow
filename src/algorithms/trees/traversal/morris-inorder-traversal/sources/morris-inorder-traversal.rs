// Morris In-Order Traversal — O(1) space in-order traversal using temporary threading

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn morris_inorder_traversal(root: Option<Box<BSTNode>>) -> Vec<i32> {
    // Flatten tree into indexed nodes for pointer-safe mutation
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
    let mut current: Option<usize> = if flat_nodes.is_empty() { None } else { Some(0) }; // @step:initialize

    while let Some(curr_idx) = current {
        // @step:initialize
        if flat_nodes[curr_idx].left.is_none() {
            // @step:visit
            // No left child — visit current and move right
            result.push(flat_nodes[curr_idx].value); // @step:visit
            current = flat_nodes[curr_idx].right;    // @step:traverse-right
        } else {
            // Find the inorder predecessor (rightmost node in left subtree)
            let left_idx = flat_nodes[curr_idx].left.unwrap();
            let mut predecessor_idx = left_idx; // @step:thread-node
            while flat_nodes[predecessor_idx].right.is_some()
                && flat_nodes[predecessor_idx].right != Some(curr_idx)
            {
                // @step:thread-node
                predecessor_idx = flat_nodes[predecessor_idx].right.unwrap(); // @step:thread-node
            }

            if flat_nodes[predecessor_idx].right.is_none() {
                // @step:thread-node
                // Thread: make predecessor point back to current
                flat_nodes[predecessor_idx].right = Some(curr_idx); // @step:thread-node
                current = flat_nodes[curr_idx].left;                // @step:traverse-left
            } else {
                // Unthread: restore predecessor's right, visit current, move right
                flat_nodes[predecessor_idx].right = None;           // @step:unthread-node
                result.push(flat_nodes[curr_idx].value);            // @step:visit
                current = flat_nodes[curr_idx].right;               // @step:traverse-right
            }
        }
    }

    result // @step:complete
}
