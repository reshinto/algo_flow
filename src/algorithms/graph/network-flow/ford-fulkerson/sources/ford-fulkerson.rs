// Ford-Fulkerson — max flow via DFS augmenting paths in a residual graph
use std::collections::HashMap;

pub struct FlowEdge {
    pub target: String,
    pub capacity: i64,
}

pub fn ford_fulkerson(
    adjacency_list: &HashMap<String, Vec<FlowEdge>>,
    source_node_id: &str,
    sink_node_id: &str,
) -> i64 {
    if source_node_id == sink_node_id {
        return 0; // @step:initialize
    }

    let mut residual_capacity: HashMap<String, HashMap<String, i64>> = HashMap::new(); // @step:initialize
    for node_id in adjacency_list.keys() {
        residual_capacity.entry(node_id.clone()).or_default(); // @step:initialize
    }
    for (node_id, edges) in adjacency_list {
        for flow_edge in edges {
            residual_capacity.entry(flow_edge.target.clone()).or_default();
            let prev = residual_capacity
                .get(node_id)
                .and_then(|m| m.get(&flow_edge.target))
                .copied()
                .unwrap_or(0);
            residual_capacity
                .entry(node_id.clone())
                .or_default()
                .insert(flow_edge.target.clone(), prev + flow_edge.capacity); // @step:initialize
        }
    }

    let mut max_flow: i64 = 0; // @step:initialize

    fn dfs_augment(
        current_id: &str,
        sink_node_id: &str,
        visited_set: &mut Vec<String>,
        bottleneck: i64,
        residual_capacity: &mut HashMap<String, HashMap<String, i64>>,
    ) -> i64 {
        if current_id == sink_node_id {
            return bottleneck; // @step:dfs-augment
        }
        visited_set.push(current_id.to_string()); // @step:dfs-augment
        let neighbors: Vec<String> = residual_capacity
            .get(current_id)
            .map(|m| m.keys().cloned().collect())
            .unwrap_or_default(); // @step:visit-edge
        for neighbor_id in &neighbors {
            let residual = residual_capacity
                .get(current_id)
                .and_then(|m| m.get(neighbor_id.as_str()))
                .copied()
                .unwrap_or(0); // @step:visit-edge
            if !visited_set.contains(neighbor_id) && residual > 0 {
                let flow = dfs_augment(
                    neighbor_id,
                    sink_node_id,
                    visited_set,
                    bottleneck.min(residual),
                    residual_capacity,
                ); // @step:augment-flow
                if flow > 0 {
                    let fwd = residual_capacity
                        .get(current_id)
                        .and_then(|m| m.get(neighbor_id.as_str()))
                        .copied()
                        .unwrap_or(0);
                    residual_capacity
                        .entry(current_id.to_string())
                        .or_default()
                        .insert(neighbor_id.clone(), fwd - flow); // @step:augment-flow
                    let back = residual_capacity
                        .get(neighbor_id.as_str())
                        .and_then(|m| m.get(current_id))
                        .copied()
                        .unwrap_or(0);
                    residual_capacity
                        .entry(neighbor_id.clone())
                        .or_default()
                        .insert(current_id.to_string(), back + flow); // @step:augment-flow
                    return flow; // @step:augment-flow
                }
            }
        }
        0 // @step:dfs-augment
    }

    loop {
        let mut visited_set: Vec<String> = Vec::new(); // @step:augment-flow
        let path_flow = dfs_augment(
            source_node_id,
            sink_node_id,
            &mut visited_set,
            i64::MAX,
            &mut residual_capacity,
        ); // @step:augment-flow
        if path_flow == 0 {
            break; // @step:augment-flow
        }
        max_flow += path_flow; // @step:augment-flow
    }

    max_flow // @step:complete
}
