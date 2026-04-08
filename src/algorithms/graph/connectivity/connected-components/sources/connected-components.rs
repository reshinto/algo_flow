// Connected Components — find all connected components in an undirected graph using BFS
use std::collections::{HashMap, HashSet, VecDeque};

pub fn connected_components(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> Vec<Vec<String>> {
    let mut components: Vec<Vec<String>> = Vec::new(); // @step:initialize
    let mut visited_set: HashSet<String> = HashSet::new(); // @step:initialize

    for start_node_id in node_ids {
        if visited_set.contains(start_node_id.as_str()) {
            continue; // @step:initialize
        }

        let mut current_component: Vec<String> = Vec::new(); // @step:enqueue
        let mut node_queue: VecDeque<String> = VecDeque::new(); // @step:enqueue
        node_queue.push_back(start_node_id.clone()); // @step:enqueue
        visited_set.insert(start_node_id.clone()); // @step:enqueue

        while let Some(current_node_id) = node_queue.pop_front() {
            // @step:dequeue
            current_component.push(current_node_id.clone()); // @step:dequeue,visit

            let empty_vec = Vec::new();
            let neighbors = adjacency_list.get(&current_node_id).unwrap_or(&empty_vec);
            for neighbor_id in neighbors {
                if !visited_set.contains(neighbor_id.as_str()) {
                    visited_set.insert(neighbor_id.clone()); // @step:visit-edge
                    node_queue.push_back(neighbor_id.clone()); // @step:visit-edge,enqueue
                }
            }
        }

        components.push(current_component); // @step:assign-component
    }

    components // @step:complete
}
