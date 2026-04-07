// A* search — finds shortest path using f = g + h (cost-so-far + heuristic estimate)
use std::collections::{HashMap, HashSet};

pub fn a_star_search(
    adjacency_list: &HashMap<String, Vec<(String, i64)>>,
    start_node_id: &str,
    target_node_id: &str,
    heuristic: &HashMap<String, i64>,
) -> Option<Vec<String>> {
    let mut g_costs: HashMap<String, i64> = HashMap::new(); // @step:initialize
    let mut predecessors: HashMap<String, Option<String>> = HashMap::new(); // @step:initialize
    let mut visited: HashSet<String> = HashSet::new(); // @step:initialize

    for node_id in adjacency_list.keys() {
        g_costs.insert(node_id.clone(), i64::MAX); // @step:initialize
        predecessors.insert(node_id.clone(), None); // @step:initialize
    }
    g_costs.insert(start_node_id.to_string(), 0); // @step:initialize

    // Open set as priority queue: (f_cost, node_id)
    let heuristic_start = *heuristic.get(start_node_id).unwrap_or(&0);
    let mut open_queue: Vec<(i64, String)> = vec![(heuristic_start, start_node_id.to_string())]; // @step:initialize

    while !open_queue.is_empty() {
        open_queue.sort_by(|pairA, pairB| pairA.0.cmp(&pairB.0));
        let (_, current_node_id) = open_queue.remove(0); // @step:dequeue

        if visited.contains(&current_node_id) {
            continue; // @step:dequeue
        }
        visited.insert(current_node_id.clone()); // @step:visit

        if current_node_id == target_node_id {
            // Reconstruct path
            let mut path: Vec<String> = Vec::new();
            let mut trace_id: Option<String> = Some(current_node_id.clone());
            while let Some(ref node_id) = trace_id {
                path.insert(0, node_id.clone());
                trace_id = predecessors.get(node_id.as_str()).and_then(|p| p.clone());
            }
            return Some(path); // @step:complete
        }

        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(&current_node_id).unwrap_or(&empty_vec);
        for (neighbor_id, edge_weight) in neighbors {
            if visited.contains(neighbor_id.as_str()) {
                continue;
            }
            let current_g = *g_costs.get(&current_node_id).unwrap_or(&i64::MAX);
            let tentative_g_cost = current_g.saturating_add(*edge_weight); // @step:relax-edge
            let neighbor_g = *g_costs.get(neighbor_id.as_str()).unwrap_or(&i64::MAX);
            if tentative_g_cost < neighbor_g {
                g_costs.insert(neighbor_id.clone(), tentative_g_cost); // @step:update-distance
                predecessors.insert(neighbor_id.clone(), Some(current_node_id.clone())); // @step:update-distance
                let f_cost = tentative_g_cost + *heuristic.get(neighbor_id.as_str()).unwrap_or(&0);
                open_queue.push((f_cost, neighbor_id.clone())); // @step:update-distance
            }
        }
    }

    None // @step:complete
}
