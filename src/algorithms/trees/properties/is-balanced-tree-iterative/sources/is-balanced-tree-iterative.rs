// Is Balanced Tree (Iterative) — bottom-up post-order using stack with height tracking

use std::collections::HashMap;

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn is_balanced_tree_iterative(root: Option<Box<TreeNode>>) -> bool {
    if root.is_none() {
        return true; // @step:initialize
    }

    // Flatten the tree into indexed nodes for pointer-free iterative traversal
    struct FlatNode {
        value: i32,
        left: Option<usize>,
        right: Option<usize>,
    }

    let mut flat_nodes: Vec<FlatNode> = Vec::new(); // @step:initialize

    fn flatten(node: Option<Box<TreeNode>>, nodes: &mut Vec<FlatNode>) -> Option<usize> {
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

    // Stack stores (node_index, phase): phase 0 = push left, 1 = push right, 2 = compute
    let mut node_stack: Vec<(usize, u8)> = vec![(0, 0)]; // @step:initialize
    let mut heights: HashMap<usize, i32> = HashMap::new(); // @step:initialize

    while let Some(entry) = node_stack.last_mut() {
        // @step:visit
        let (node_index, phase) = *entry; // @step:visit
        let node = &flat_nodes[node_index]; // @step:visit

        if phase == 0 {
            entry.1 = 1; // @step:visit
            if let Some(left_index) = node.left {
                node_stack.push((left_index, 0)); // @step:traverse-left
            }
        } else if phase == 1 {
            entry.1 = 2; // @step:visit
            let right_index = flat_nodes[node_index].right;
            if let Some(right_idx) = right_index {
                node_stack.push((right_idx, 0)); // @step:traverse-right
            }
        } else {
            node_stack.pop(); // @step:visit
            let left_height = flat_nodes[node_index].left.and_then(|idx| heights.get(&idx)).copied().unwrap_or(0); // @step:check-balance
            let right_height = flat_nodes[node_index].right.and_then(|idx| heights.get(&idx)).copied().unwrap_or(0); // @step:check-balance

            if (left_height - right_height).abs() > 1 {
                return false; // @step:check-balance
            }

            heights.insert(node_index, left_height.max(right_height) + 1); // @step:update-height
        }
    }

    true // @step:complete
}
