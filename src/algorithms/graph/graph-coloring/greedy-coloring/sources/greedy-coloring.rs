// Greedy Graph Coloring — assign smallest available color to each node in order
use std::collections::{HashMap, HashSet};

pub fn greedy_coloring(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> HashMap<String, u32> {
    let mut color_assignment: HashMap<String, u32> = HashMap::new(); // @step:initialize

    for node_id in node_ids {
        let mut neighbor_colors: HashSet<u32> = HashSet::new(); // @step:visit-node
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(node_id).unwrap_or(&empty_vec); // @step:visit-node
        for neighbor_id in neighbors {
            if let Some(&color) = color_assignment.get(neighbor_id.as_str()) {
                neighbor_colors.insert(color); // @step:visit-node
            }
        }

        let mut assigned_color: u32 = 0; // @step:assign-color
        while neighbor_colors.contains(&assigned_color) {
            assigned_color += 1; // @step:assign-color
        }
        color_assignment.insert(node_id.clone(), assigned_color); // @step:assign-color
    }

    color_assignment // @step:complete
}
