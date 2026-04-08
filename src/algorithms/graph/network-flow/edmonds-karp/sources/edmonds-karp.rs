// Edmonds-Karp — max flow via BFS shortest augmenting paths (guaranteed O(VE^2))
use std::collections::HashMap;

pub struct FlowEdge {
    pub target: String,
    pub capacity: i64,
}

pub fn edmonds_karp(
    adjacency_list: &HashMap<String, Vec<FlowEdge>>,
    source_node_id: &str,
    sink_node_id: &str,
) -> i64 {
    let mut residual_capacity: HashMap<String, HashMap<String, i64>> = HashMap::new(); // @step:initialize
    for (node_id, edges) in adjacency_list {
        residual_capacity.entry(node_id.clone()).or_default();
        for flow_edge in edges {
            residual_capacity.entry(flow_edge.target.clone()).or_default();
        }
    }
    for (node_id, edges) in adjacency_list {
        for flow_edge in edges {
            let prev = *residual_capacity
                .get(node_id).and_then(|m| m.get(&flow_edge.target)).unwrap_or(&0);
            residual_capacity
                .entry(node_id.clone()).or_default()
                .insert(flow_edge.target.clone(), prev + flow_edge.capacity); // @step:initialize
        }
    }

    let mut max_flow: i64 = 0; // @step:initialize

    // BFS to find shortest augmenting path; returns parent map or None if no path
    let bfs_find_path = |residual: &HashMap<String, HashMap<String, i64>>| -> Option<HashMap<String, String>> {
        let mut parent_map: HashMap<String, String> = HashMap::new(); // @step:enqueue
        let mut visited_set: Vec<String> = vec![source_node_id.to_string()]; // @step:enqueue
        let mut node_queue: Vec<String> = vec![source_node_id.to_string()]; // @step:enqueue

        while !node_queue.is_empty() {
            let current_id = node_queue.remove(0); // @step:dequeue
            let empty_map = HashMap::new();
            let neighbors = residual.get(&current_id).unwrap_or(&empty_map); // @step:visit-node
            for (neighbor_id, &residual_cap) in neighbors {
                let residual_val = residual_cap; // @step:visit-node
                if !visited_set.contains(neighbor_id) && residual_val > 0 {
                    visited_set.push(neighbor_id.clone()); // @step:enqueue
                    parent_map.insert(neighbor_id.clone(), current_id.clone()); // @step:enqueue
                    node_queue.push(neighbor_id.clone()); // @step:enqueue
                    if neighbor_id == sink_node_id {
                        return Some(parent_map); // @step:enqueue
                    }
                }
            }
        }
        None // @step:dequeue
    };

    let mut parent_map_opt = bfs_find_path(&residual_capacity); // @step:augment-flow
    while let Some(ref parent_map) = parent_map_opt {
        // Find bottleneck capacity along the path
        let mut bottleneck: i64 = i64::MAX; // @step:augment-flow
        let mut current_id = sink_node_id.to_string(); // @step:augment-flow
        while current_id != source_node_id {
            let parent_id = parent_map.get(&current_id).unwrap().clone(); // @step:augment-flow
            let residual_val = residual_capacity
                .get(&parent_id)
                .and_then(|m| m.get(&current_id))
                .copied()
                .unwrap_or(0); // @step:augment-flow
            bottleneck = bottleneck.min(residual_val); // @step:augment-flow
            current_id = parent_id; // @step:augment-flow
        }

        // Update residual capacities along the path
        let mut current_id = sink_node_id.to_string(); // @step:augment-flow
        while current_id != source_node_id {
            let parent_id = parent_map.get(&current_id).unwrap().clone(); // @step:augment-flow
            let fwd = residual_capacity
                .get(&parent_id)
                .and_then(|m| m.get(&current_id))
                .copied()
                .unwrap_or(0); // @step:augment-flow
            residual_capacity
                .entry(parent_id.clone())
                .or_default()
                .insert(current_id.clone(), fwd - bottleneck); // @step:augment-flow
            let back = residual_capacity
                .get(&current_id)
                .and_then(|m| m.get(&parent_id))
                .copied()
                .unwrap_or(0); // @step:augment-flow
            residual_capacity
                .entry(current_id.clone())
                .or_default()
                .insert(parent_id.clone(), back + bottleneck); // @step:augment-flow
            current_id = parent_id; // @step:augment-flow
        }

        max_flow += bottleneck; // @step:augment-flow
        parent_map_opt = bfs_find_path(&residual_capacity); // @step:augment-flow
    }

    max_flow // @step:complete
}
