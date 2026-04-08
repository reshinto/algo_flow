// DFS Topological Sort — post-order DFS, prepend finished nodes to result
use std::collections::{HashMap, HashSet};

pub fn dfs_topological_sort(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> Vec<String> {
    let mut visited_set: HashSet<String> = HashSet::new(); // @step:initialize
    let mut topological_order: Vec<String> = Vec::new(); // @step:initialize

    fn dfs_visit(
        current_node_id: &str,
        adjacency_list: &HashMap<String, Vec<String>>,
        visited_set: &mut HashSet<String>,
        topological_order: &mut Vec<String>,
    ) {
        visited_set.insert(current_node_id.to_string()); // @step:visit
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(current_node_id).unwrap_or(&empty_vec); // @step:visit
        for neighbor_id in neighbors {
            if !visited_set.contains(neighbor_id.as_str()) {
                // @step:push-stack
                dfs_visit(neighbor_id, adjacency_list, visited_set, topological_order); // @step:push-stack
            }
        }
        topological_order.insert(0, current_node_id.to_string()); // @step:add-to-order
    }

    for node_id in node_ids {
        if !visited_set.contains(node_id.as_str()) {
            // @step:push-stack
            dfs_visit(node_id, adjacency_list, &mut visited_set, &mut topological_order); // @step:push-stack
        }
    }

    topological_order // @step:complete
}
