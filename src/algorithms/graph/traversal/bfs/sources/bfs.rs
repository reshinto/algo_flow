// BFS — traverse level-by-level using a FIFO queue
use std::collections::{HashMap, HashSet, VecDeque};

pub fn breadth_first_search(
    adjacency_list: &HashMap<String, Vec<String>>,
    start_node_id: &str,
) -> Vec<String> {
    let mut visit_order: Vec<String> = Vec::new(); // @step:initialize
    let mut visited_set: HashSet<String> = HashSet::new(); // @step:initialize
    let mut node_queue: VecDeque<String> = VecDeque::new(); // @step:initialize
    node_queue.push_back(start_node_id.to_string()); // @step:initialize
    visited_set.insert(start_node_id.to_string()); // @step:initialize

    while let Some(current_node_id) = node_queue.pop_front() {
        // @step:dequeue
        visit_order.push(current_node_id.clone()); // @step:dequeue,visit
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(&current_node_id).unwrap_or(&empty_vec);
        // Mark as visited when enqueuing to avoid duplicate queue entries
        for neighbor_id in neighbors {
            if !visited_set.contains(neighbor_id.as_str()) {
                // @step:visit-edge
                visited_set.insert(neighbor_id.clone()); // @step:visit-edge
                node_queue.push_back(neighbor_id.clone()); // @step:visit-edge,enqueue
            }
        }
    }
    visit_order // @step:complete
}
