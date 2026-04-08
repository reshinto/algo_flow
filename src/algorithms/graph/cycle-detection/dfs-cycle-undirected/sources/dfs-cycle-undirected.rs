// DFS Cycle Detection (Undirected) — parent tracking to identify back edges
use std::collections::HashSet;
use std::collections::HashMap;

pub fn dfs_cycle_undirected(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> bool {
    let mut visited_set: HashSet<String> = HashSet::new(); // @step:initialize

    fn dfs_visit(
        current_node_id: &str,
        parent_node_id: Option<&str>,
        adjacency_list: &HashMap<String, Vec<String>>,
        visited_set: &mut HashSet<String>,
    ) -> bool {
        visited_set.insert(current_node_id.to_string()); // @step:push-stack

        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(current_node_id).unwrap_or(&empty_vec); // @step:visit
        for neighbor_id in neighbors {
            if !visited_set.contains(neighbor_id.as_str()) {
                // @step:classify-edge
                if dfs_visit(neighbor_id, Some(current_node_id), adjacency_list, visited_set) {
                    // @step:classify-edge
                    return true; // @step:classify-edge
                }
            } else if Some(neighbor_id.as_str()) != parent_node_id {
                // @step:classify-edge
                return true; // @step:classify-edge
            }
        }

        false // @step:pop-stack
    }

    for node_id in node_ids {
        if !visited_set.contains(node_id.as_str()) {
            // @step:visit
            if dfs_visit(node_id, None, adjacency_list, &mut visited_set) {
                // @step:visit
                return true; // @step:complete
            }
        }
    }

    false // @step:complete
}
