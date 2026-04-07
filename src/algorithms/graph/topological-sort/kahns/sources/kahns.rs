// Kahn's Algorithm — topological sort using BFS and in-degree tracking
use std::collections::HashMap;

pub fn kahns_topological_sort(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> Vec<String> {
    let mut in_degree_map: HashMap<String, u32> = HashMap::new(); // @step:initialize
    for node_id in node_ids {
        in_degree_map.insert(node_id.clone(), 0);
    } // @step:initialize
    for node_id in node_ids {
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(node_id).unwrap_or(&empty_vec); // @step:initialize
        for neighbor_id in neighbors {
            let count = in_degree_map.entry(neighbor_id.clone()).or_insert(0);
            *count += 1;
        } // @step:initialize
    }

    let mut node_queue: Vec<String> = Vec::new(); // @step:initialize
    for node_id in node_ids {
        if *in_degree_map.get(node_id).unwrap_or(&0) == 0 {
            node_queue.push(node_id.clone());
        } // @step:enqueue
    }

    let mut topological_order: Vec<String> = Vec::new();

    while !node_queue.is_empty() {
        let current_node_id = node_queue.remove(0); // @step:dequeue
        topological_order.push(current_node_id.clone()); // @step:add-to-order

        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(&current_node_id).unwrap_or(&empty_vec).clone();
        for neighbor_id in &neighbors {
            let degree = in_degree_map.entry(neighbor_id.clone()).or_insert(1);
            *degree = degree.saturating_sub(1); // @step:visit
            if *degree == 0 {
                node_queue.push(neighbor_id.clone());
            } // @step:enqueue
        }
    }

    topological_order // @step:complete
}
