// DFS — traverse depth-first using a LIFO stack
use std::collections::{HashMap, HashSet};

pub fn depth_first_search(
    adjacency_list: &HashMap<String, Vec<String>>,
    start_node_id: &str,
) -> Vec<String> {
    let mut visit_order: Vec<String> = Vec::new(); // @step:initialize
    let mut visited_set: HashSet<String> = HashSet::new(); // @step:initialize
    let mut node_stack: Vec<String> = vec![start_node_id.to_string()]; // @step:initialize,push-stack

    while let Some(current_node_id) = node_stack.pop() {
        // @step:pop-stack
        if visited_set.contains(&current_node_id) {
            continue; // @step:pop-stack
        }
        visited_set.insert(current_node_id.clone()); // @step:visit
        visit_order.push(current_node_id.clone()); // @step:visit

        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(&current_node_id).unwrap_or(&empty_vec);
        for neighbor_id in neighbors {
            if !visited_set.contains(neighbor_id.as_str()) {
                // @step:visit-edge
                node_stack.push(neighbor_id.clone()); // @step:visit-edge,push-stack
            }
        }
    }
    visit_order // @step:complete
}
