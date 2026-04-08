// Vertical-Order Traversal — BFS grouping nodes by vertical column index

use std::collections::{HashMap, VecDeque};

struct BSTNode {
    value: i32,
    left: Option<Box<BSTNode>>,
    right: Option<Box<BSTNode>>,
}

fn vertical_order_traversal(root: Option<Box<BSTNode>>) -> Vec<Vec<i32>> {
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

    // Queue stores [node_index, column] pairs
    let mut queue: VecDeque<(usize, i32)> = VecDeque::new(); // @step:initialize
    queue.push_back((0, 0)); // @step:initialize
    let mut column_map: HashMap<i32, Vec<i32>> = HashMap::new(); // @step:initialize
    let mut min_column: i32 = 0; // @step:initialize
    let mut max_column: i32 = 0; // @step:initialize

    while let Some((node_idx, column)) = queue.pop_front() {
        // @step:enqueue-node
        // @step:dequeue-node

        // Record this node's value in its column
        column_map.entry(column).or_insert_with(Vec::new); // @step:visit
        column_map.get_mut(&column).unwrap().push(flat_nodes[node_idx].value); // @step:visit

        if column < min_column { min_column = column; } // @step:visit
        if column > max_column { max_column = column; } // @step:visit

        if let Some(left_idx) = flat_nodes[node_idx].left {
            // @step:enqueue-node
            queue.push_back((left_idx, column - 1)); // @step:enqueue-node
        }
        if let Some(right_idx) = flat_nodes[node_idx].right {
            // @step:enqueue-node
            queue.push_back((right_idx, column + 1)); // @step:enqueue-node
        }
    }

    // Collect columns in order from leftmost to rightmost
    for col in min_column..=max_column {
        // @step:visit
        if let Some(values) = column_map.get(&col) {
            result.push(values.clone()); // @step:visit
        }
    }

    result // @step:complete
}
