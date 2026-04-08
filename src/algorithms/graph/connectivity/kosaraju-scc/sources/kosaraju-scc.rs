// Kosaraju's SCC — two-pass DFS: first pass collects finish order, second pass on transposed graph
use std::collections::{HashMap, HashSet};

pub fn kosaraju_scc(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> Vec<Vec<String>> {
    let mut visited_set: HashSet<String> = HashSet::new(); // @step:initialize
    let mut finish_order: Vec<String> = Vec::new(); // @step:initialize

    // First pass: DFS on original graph to collect finish order
    fn dfs_first_pass(
        node_id: &str,
        adjacency_list: &HashMap<String, Vec<String>>,
        visited_set: &mut HashSet<String>,
        finish_order: &mut Vec<String>,
    ) {
        visited_set.insert(node_id.to_string()); // @step:visit
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(node_id).unwrap_or(&empty_vec);
        for neighbor_id in neighbors {
            if !visited_set.contains(neighbor_id.as_str()) {
                dfs_first_pass(neighbor_id, adjacency_list, visited_set, finish_order); // @step:visit-edge
            }
        }
        finish_order.push(node_id.to_string()); // @step:push-stack
    }

    for node_id in node_ids {
        if !visited_set.contains(node_id.as_str()) {
            dfs_first_pass(node_id, adjacency_list, &mut visited_set, &mut finish_order); // @step:initialize
        }
    }

    // Build transposed adjacency list
    let mut transposed_list: HashMap<String, Vec<String>> = HashMap::new(); // @step:initialize
    for node_id in node_ids {
        transposed_list.entry(node_id.clone()).or_default();
    }
    for source_id in node_ids {
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(source_id).unwrap_or(&empty_vec);
        for target_id in neighbors {
            transposed_list
                .entry(target_id.clone())
                .or_default()
                .push(source_id.clone()); // @step:initialize
        }
    }

    // Second pass: DFS on transposed graph in reverse finish order
    visited_set.clear(); // @step:initialize
    let mut components: Vec<Vec<String>> = Vec::new(); // @step:initialize

    fn dfs_second_pass(
        node_id: &str,
        transposed_list: &HashMap<String, Vec<String>>,
        visited_set: &mut HashSet<String>,
        current_component: &mut Vec<String>,
    ) {
        visited_set.insert(node_id.to_string()); // @step:visit
        current_component.push(node_id.to_string()); // @step:visit
        let empty_vec = Vec::new();
        let neighbors = transposed_list.get(node_id).unwrap_or(&empty_vec);
        for neighbor_id in neighbors {
            if !visited_set.contains(neighbor_id.as_str()) {
                dfs_second_pass(neighbor_id, transposed_list, visited_set, current_component); // @step:visit-edge
            }
        }
    }

    for index in (0..finish_order.len()).rev() {
        let node_id = &finish_order[index].clone();
        if !visited_set.contains(node_id.as_str()) {
            let mut current_component: Vec<String> = Vec::new(); // @step:pop-stack
            dfs_second_pass(node_id, &transposed_list, &mut visited_set, &mut current_component); // @step:pop-stack
            components.push(current_component); // @step:assign-component
        }
    }

    components // @step:complete
}
