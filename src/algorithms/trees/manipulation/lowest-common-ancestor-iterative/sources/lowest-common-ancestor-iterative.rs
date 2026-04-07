// Lowest Common Ancestor Iterative — BFS to build parent map, then trace ancestors

use std::collections::{HashMap, HashSet, VecDeque};

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn lowest_common_ancestor_iterative(
    root: &Option<Box<BinaryNode>>,
    node_value_a: i32,
    node_value_b: i32,
) -> Option<i32> {
    let root_node = root.as_ref()?;
    if root.is_none() {
        return None; // @step:initialize
    }

    // Build parent map using BFS
    let mut parent_map: HashMap<i32, Option<i32>> = HashMap::new(); // @step:initialize
    parent_map.insert(root_node.value, None); // @step:initialize
    let mut bfs_queue: VecDeque<*const BinaryNode> = VecDeque::new(); // @step:initialize
    bfs_queue.push_back(root_node.as_ref() as *const BinaryNode);

    // BFS until we find both target nodes
    let mut node_a_value: Option<i32> = None;
    let mut node_b_value: Option<i32> = None;

    while !bfs_queue.is_empty() && (node_a_value.is_none() || node_b_value.is_none()) {
        // @step:visit
        let current_ptr = bfs_queue.pop_front().unwrap(); // @step:dequeue

        unsafe {
            let current = &*current_ptr;
            if current.value == node_value_a {
                node_a_value = Some(current.value); // @step:compare
            }
            if current.value == node_value_b {
                node_b_value = Some(current.value); // @step:compare
            }

            if let Some(left) = current.left.as_ref() {
                // @step:enqueue
                parent_map.insert(left.value, Some(current.value)); // @step:enqueue
                bfs_queue.push_back(left.as_ref() as *const BinaryNode); // @step:enqueue
            }
            if let Some(right) = current.right.as_ref() {
                // @step:enqueue
                parent_map.insert(right.value, Some(current.value)); // @step:enqueue
                bfs_queue.push_back(right.as_ref() as *const BinaryNode); // @step:enqueue
            }
        }
    }

    let start_a = node_a_value?;
    let start_b = node_b_value?;

    // Trace ancestors of node_a into a set
    let mut ancestors_a: HashSet<i32> = HashSet::new(); // @step:visit
    let mut trace_node: Option<i32> = Some(start_a);
    while let Some(trace_val) = trace_node {
        // @step:visit
        ancestors_a.insert(trace_val); // @step:visit
        trace_node = parent_map.get(&trace_val).copied().flatten(); // @step:visit
    }

    // Walk ancestors of node_b until we hit the first ancestor also in ancestors_a
    trace_node = Some(start_b);
    while let Some(trace_val) = trace_node {
        // @step:visit
        if ancestors_a.contains(&trace_val) {
            return Some(trace_val); // @step:compare
        }
        trace_node = parent_map.get(&trace_val).copied().flatten(); // @step:visit
    }

    None // @step:complete
}
