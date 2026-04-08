// DAG Shortest Path — finds shortest paths from a source in a directed acyclic graph
// using topological sort followed by edge relaxation in topological order
use std::collections::{HashMap, HashSet};

pub fn dag_shortest_path(
    adjacency_list: &HashMap<String, Vec<(String, i64)>>,
    start_node_id: &str,
    node_ids: &[String],
) -> HashMap<String, i64> {
    let mut distances: HashMap<String, i64> = HashMap::new(); // @step:initialize
    for node_id in node_ids {
        distances.insert(node_id.clone(), i64::MAX); // @step:initialize
    }
    distances.insert(start_node_id.to_string(), 0); // @step:initialize

    // Topological sort via DFS
    let mut visited: HashSet<String> = HashSet::new(); // @step:initialize
    let mut topological_order: Vec<String> = Vec::new(); // @step:initialize

    fn dfs_visit(
        node_id: &str,
        adjacency_list: &HashMap<String, Vec<(String, i64)>>,
        visited: &mut HashSet<String>,
        topological_order: &mut Vec<String>,
    ) {
        visited.insert(node_id.to_string());
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(node_id).unwrap_or(&empty_vec);
        for (neighbor_id, _) in neighbors {
            if !visited.contains(neighbor_id.as_str()) {
                dfs_visit(neighbor_id, adjacency_list, visited, topological_order);
            }
        }
        topological_order.insert(0, node_id.to_string()); // @step:add-to-order
    }

    for node_id in node_ids {
        if !visited.contains(node_id.as_str()) {
            dfs_visit(node_id, adjacency_list, &mut visited, &mut topological_order);
        }
    }

    // Relax edges in topological order
    for node_id in &topological_order {
        let node_dist = *distances.get(node_id).unwrap_or(&i64::MAX);
        if node_dist == i64::MAX {
            continue; // @step:process-node
        }
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(node_id).unwrap_or(&empty_vec).clone();
        for (neighbor_id, edge_weight) in &neighbors {
            let tentative_distance = node_dist + edge_weight; // @step:relax-edge
            let neighbor_dist = *distances.get(neighbor_id.as_str()).unwrap_or(&i64::MAX);
            if tentative_distance < neighbor_dist {
                distances.insert(neighbor_id.clone(), tentative_distance); // @step:update-distance
            }
        }
    }

    distances // @step:complete
}
