// Dijkstra's algorithm — finds shortest paths from a source using a min-priority queue
use std::collections::{HashMap, HashSet};

pub fn dijkstra_shortest_path(
    adjacency_list: &HashMap<String, Vec<(String, i64)>>,
    start_node_id: &str,
) -> HashMap<String, i64> {
    let mut distances: HashMap<String, i64> = HashMap::new(); // @step:initialize
    let mut visited: HashSet<String> = HashSet::new(); // @step:initialize

    // Initialize all distances to i64::MAX
    for node_id in adjacency_list.keys() {
        distances.insert(node_id.clone(), i64::MAX); // @step:initialize
    }
    distances.insert(start_node_id.to_string(), 0); // @step:initialize

    // Min-priority queue: (distance, node_id)
    let mut priority_queue: Vec<(i64, String)> = vec![(0, start_node_id.to_string())]; // @step:initialize

    while !priority_queue.is_empty() {
        priority_queue.sort_by(|pairA, pairB| pairA.0.cmp(&pairB.0));
        let (current_dist, current_node_id) = priority_queue.remove(0); // @step:dequeue

        if visited.contains(&current_node_id) {
            continue; // @step:dequeue
        }
        visited.insert(current_node_id.clone()); // @step:visit

        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(&current_node_id).unwrap_or(&empty_vec);
        for (neighbor_id, edge_weight) in neighbors {
            let tentative_distance = current_dist + edge_weight; // @step:relax-edge
            let neighbor_dist = *distances.get(neighbor_id.as_str()).unwrap_or(&i64::MAX);
            if tentative_distance < neighbor_dist {
                distances.insert(neighbor_id.clone(), tentative_distance); // @step:update-distance
                priority_queue.push((tentative_distance, neighbor_id.clone())); // @step:update-distance
            }
        }
    }

    distances // @step:complete
}
