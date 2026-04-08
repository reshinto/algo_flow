// Bidirectional BFS — two simultaneous frontiers from start and target meeting in the middle
use std::collections::HashMap;

pub fn bidirectional_bfs(
    adjacency_list: &HashMap<String, Vec<String>>,
    start_node_id: &str,
    target_node_id: &str,
) -> Option<Vec<String>> {
    if start_node_id == target_node_id {
        return Some(vec![start_node_id.to_string()]); // @step:initialize
    }

    let mut forward_visited: HashMap<String, Option<String>> = HashMap::new(); // @step:initialize
    let mut backward_visited: HashMap<String, Option<String>> = HashMap::new(); // @step:initialize
    let mut forward_queue: Vec<String> = vec![start_node_id.to_string()]; // @step:initialize
    let mut backward_queue: Vec<String> = vec![target_node_id.to_string()]; // @step:initialize
    forward_visited.insert(start_node_id.to_string(), None); // @step:initialize
    backward_visited.insert(target_node_id.to_string(), None); // @step:initialize

    // Build undirected neighbor lookup by merging both edge directions
    let mut undirected_neighbors: HashMap<String, Vec<String>> = HashMap::new();
    for (node_id, neighbors) in adjacency_list {
        undirected_neighbors
            .entry(node_id.clone())
            .or_default()
            .extend(neighbors.iter().cloned());
        for neighbor_id in neighbors {
            let reverse = undirected_neighbors.entry(neighbor_id.clone()).or_default();
            if !reverse.contains(node_id) {
                reverse.push(node_id.clone());
            }
        }
    }

    while !forward_queue.is_empty() || !backward_queue.is_empty() {
        // Expand the forward frontier one level
        if !forward_queue.is_empty() {
            let current_node_id = forward_queue.remove(0); // @step:dequeue
            let empty_vec = Vec::new();
            let forward_neighbors = undirected_neighbors.get(&current_node_id).unwrap_or(&empty_vec).clone();
            for neighbor_id in &forward_neighbors {
                // @step:visit-edge
                if !forward_visited.contains_key(neighbor_id.as_str()) {
                    forward_visited.insert(neighbor_id.clone(), Some(current_node_id.clone())); // @step:visit-edge
                    forward_queue.push(neighbor_id.clone()); // @step:visit-edge,enqueue
                    if backward_visited.contains_key(neighbor_id.as_str()) {
                        // @step:complete
                        return Some(reconstruct_path(&forward_visited, &backward_visited, neighbor_id)); // @step:complete
                    }
                }
            }
        }

        // Expand the backward frontier one level
        if !backward_queue.is_empty() {
            let current_node_id = backward_queue.remove(0); // @step:dequeue
            let empty_vec = Vec::new();
            let backward_neighbors = undirected_neighbors.get(&current_node_id).unwrap_or(&empty_vec).clone();
            for neighbor_id in &backward_neighbors {
                // @step:visit-edge
                if !backward_visited.contains_key(neighbor_id.as_str()) {
                    backward_visited.insert(neighbor_id.clone(), Some(current_node_id.clone())); // @step:visit-edge
                    backward_queue.push(neighbor_id.clone()); // @step:visit-edge,enqueue
                    if forward_visited.contains_key(neighbor_id.as_str()) {
                        // @step:complete
                        return Some(reconstruct_path(&forward_visited, &backward_visited, neighbor_id)); // @step:complete
                    }
                }
            }
        }
    }

    None // @step:complete
}

fn reconstruct_path(
    forward_visited: &HashMap<String, Option<String>>,
    backward_visited: &HashMap<String, Option<String>>,
    meeting_node_id: &str,
) -> Vec<String> {
    let mut forward_path: Vec<String> = Vec::new();
    let mut current_node: Option<String> = Some(meeting_node_id.to_string());
    while let Some(ref node_id) = current_node {
        forward_path.insert(0, node_id.clone());
        current_node = forward_visited.get(node_id.as_str()).and_then(|p| p.clone());
    }

    let mut backward_path: Vec<String> = Vec::new();
    let mut back_node: Option<String> = backward_visited
        .get(meeting_node_id)
        .and_then(|p| p.clone());
    while let Some(ref node_id) = back_node {
        backward_path.push(node_id.clone());
        back_node = backward_visited.get(node_id.as_str()).and_then(|p| p.clone());
    }

    forward_path.extend(backward_path);
    forward_path
}
