// DFS Cycle Detection (Directed) — three-color marking via DFS
// White = unvisited, Gray = in current stack, Black = fully processed
use std::collections::HashMap;

#[derive(PartialEq, Clone)]
enum Color {
    White,
    Gray,
    Black,
}

pub fn dfs_cycle_directed(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> bool {
    let mut color_map: HashMap<String, Color> = HashMap::new(); // @step:initialize
    for node_id in node_ids {
        // @step:initialize
        color_map.insert(node_id.clone(), Color::White); // @step:initialize
    }

    fn dfs_visit(
        current_node_id: &str,
        adjacency_list: &HashMap<String, Vec<String>>,
        color_map: &mut HashMap<String, Color>,
    ) -> bool {
        color_map.insert(current_node_id.to_string(), Color::Gray); // @step:push-stack

        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(current_node_id).unwrap_or(&empty_vec).clone(); // @step:visit
        for neighbor_id in &neighbors {
            if color_map.get(neighbor_id.as_str()) == Some(&Color::Gray) {
                // @step:classify-edge
                return true; // @step:classify-edge
            }
            if color_map.get(neighbor_id.as_str()) == Some(&Color::White) {
                // @step:classify-edge
                if dfs_visit(neighbor_id, adjacency_list, color_map) {
                    // @step:classify-edge
                    return true; // @step:classify-edge
                }
            }
        }

        color_map.insert(current_node_id.to_string(), Color::Black); // @step:process-node
        false // @step:process-node
    }

    for node_id in node_ids {
        if color_map.get(node_id.as_str()) == Some(&Color::White) {
            // @step:visit
            if dfs_visit(node_id, adjacency_list, &mut color_map) {
                // @step:visit
                return true; // @step:complete
            }
        }
    }

    false // @step:complete
}
