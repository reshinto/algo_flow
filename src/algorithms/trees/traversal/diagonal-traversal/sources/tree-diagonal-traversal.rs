// Diagonal Traversal — group nodes by diagonal (right = same diagonal, left = next diagonal)

use std::collections::{HashMap, VecDeque};

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn tree_diagonal_traversal(root: Option<Box<BSTNode>>) -> Vec<Vec<i32>> {
    let mut result: Vec<Vec<i32>> = Vec::new(); // @step:initialize
    let root = match root {
        None => return result, // @step:initialize
        Some(r) => r,
    };

    // Flatten tree into indexed nodes
    struct FlatNode {
        value: i32,
        left: Option<usize>,
        right: Option<usize>,
    }

    let mut flat_nodes: Vec<FlatNode> = Vec::new();

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

    flatten(Some(root), &mut flat_nodes);

    // Queue of [node_index, diagonal] pairs
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new(); // @step:initialize
    queue.push_back((0, 0)); // @step:initialize
    let mut diagonal_map: HashMap<usize, Vec<i32>> = HashMap::new(); // @step:initialize
    let mut max_diagonal: usize = 0; // @step:initialize

    while let Some((node_idx, diagonal)) = queue.pop_front() {
        // @step:enqueue-node
        // @step:dequeue-node

        diagonal_map.entry(diagonal).or_insert_with(Vec::new); // @step:visit
        diagonal_map.get_mut(&diagonal).unwrap().push(flat_nodes[node_idx].value); // @step:visit

        if diagonal > max_diagonal {
            max_diagonal = diagonal; // @step:visit
        }

        // Right child stays on same diagonal
        if let Some(right_idx) = flat_nodes[node_idx].right {
            // @step:traverse-right
            queue.push_back((right_idx, diagonal)); // @step:traverse-right
        }
        // Left child moves to next diagonal
        if let Some(left_idx) = flat_nodes[node_idx].left {
            // @step:traverse-left
            queue.push_back((left_idx, diagonal + 1)); // @step:traverse-left
        }
    }

    // Collect diagonals in order
    for diag in 0..=max_diagonal {
        // @step:visit
        if let Some(values) = diagonal_map.get(&diag) {
            result.push(values.clone()); // @step:visit
        }
    }

    result // @step:complete
}
