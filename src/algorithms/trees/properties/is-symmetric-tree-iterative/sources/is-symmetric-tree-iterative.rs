// Is Symmetric Tree (Iterative) — queue-based: enqueue pairs and compare

use std::collections::VecDeque;

struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

fn is_symmetric_tree_iterative(root: Option<Box<TreeNode>>) -> bool {
    let root = match root {
        None => return true, // @step:initialize
        Some(r) => r,
    };

    // Flatten tree for pointer-free comparison; use indices
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

    flatten(Some(root), &mut flat_nodes);

    let mut queue: VecDeque<(Option<usize>, Option<usize>)> = VecDeque::new(); // @step:initialize
    let root_left = flat_nodes[0].left;
    let root_right = flat_nodes[0].right;
    queue.push_back((root_left, root_right)); // @step:initialize

    while let Some(pair) = queue.pop_front() {
        // @step:visit
        let (left_index, right_index) = pair; // @step:visit

        match (left_index, right_index) {
            (None, None) => continue,          // @step:check-balance
            (None, Some(_)) | (Some(_), None) => return false, // @step:check-balance
            (Some(left_idx), Some(right_idx)) => {
                if flat_nodes[left_idx].value != flat_nodes[right_idx].value {
                    return false; // @step:check-balance
                }

                // Enqueue outer pair and inner pair
                queue.push_back((flat_nodes[left_idx].left, flat_nodes[right_idx].right)); // @step:traverse-left
                queue.push_back((flat_nodes[left_idx].right, flat_nodes[right_idx].left)); // @step:traverse-right
            }
        }
    }

    true // @step:complete
}
