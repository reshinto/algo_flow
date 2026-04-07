// Bipartite Check — 2-coloring via BFS; conflict means not bipartite
use std::collections::HashMap;

pub struct BipartiteResult {
    pub is_bipartite: bool,
    pub coloring: HashMap<String, i32>,
}

pub fn bipartite_check(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> BipartiteResult {
    let mut coloring: HashMap<String, i32> = HashMap::new(); // @step:initialize

    for start_node_id in node_ids {
        if coloring.contains_key(start_node_id.as_str()) {
            continue; // @step:initialize
        }

        coloring.insert(start_node_id.clone(), 0); // @step:enqueue
        let mut node_queue: Vec<String> = vec![start_node_id.clone()]; // @step:enqueue

        while !node_queue.is_empty() {
            let current_id = node_queue.remove(0); // @step:dequeue
            let current_color = *coloring.get(&current_id).unwrap_or(&0); // @step:visit-node
            let empty_vec = Vec::new();
            let neighbors = adjacency_list.get(&current_id).unwrap_or(&empty_vec); // @step:visit-node

            for neighbor_id in neighbors {
                if !coloring.contains_key(neighbor_id.as_str()) {
                    coloring.insert(neighbor_id.clone(), 1 - current_color); // @step:assign-color
                    node_queue.push(neighbor_id.clone()); // @step:assign-color
                } else if *coloring.get(neighbor_id.as_str()).unwrap_or(&-1) == current_color {
                    return BipartiteResult {
                        is_bipartite: false,
                        coloring,
                    }; // @step:check-conflict
                }
            }
        }
    }

    BipartiteResult {
        is_bipartite: true,
        coloring,
    } // @step:complete
}
