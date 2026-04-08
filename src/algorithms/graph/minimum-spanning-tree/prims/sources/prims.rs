// Prim's Algorithm — grow MST from start node by always selecting the cheapest outgoing edge
use std::collections::{HashMap, HashSet};

pub struct MstEdge {
    pub source: String,
    pub target: String,
    pub weight: i64,
}

pub fn prims_algorithm(
    adjacency_list: &HashMap<String, Vec<(String, i64)>>,
    start_node_id: &str,
) -> Vec<MstEdge> {
    let mut mst_edges: Vec<MstEdge> = Vec::new(); // @step:initialize
    let mut in_mst_set: HashSet<String> = HashSet::new(); // @step:initialize
    in_mst_set.insert(start_node_id.to_string()); // @step:initialize

    // Priority queue entries: (weight, source_node_id, target_node_id)
    let mut priority_queue: Vec<(i64, String, String)> = Vec::new(); // @step:initialize

    for (neighbor_id, edge_weight) in adjacency_list.get(start_node_id).unwrap_or(&Vec::new()) {
        priority_queue.push((*edge_weight, start_node_id.to_string(), neighbor_id.clone())); // @step:initialize
    }
    priority_queue.sort_by(|entryA, entryB| entryA.0.cmp(&entryB.0)); // @step:initialize

    while !priority_queue.is_empty() {
        let (edge_weight, source_id, target_id) = priority_queue.remove(0); // @step:dequeue

        if in_mst_set.contains(&target_id) {
            continue; // @step:dequeue
        }

        in_mst_set.insert(target_id.clone()); // @step:visit
        mst_edges.push(MstEdge {
            source: source_id.clone(),
            target: target_id.clone(),
            weight: edge_weight,
        }); // @step:add-to-mst

        for (neighbor_id, neighbor_weight) in adjacency_list.get(&target_id).unwrap_or(&Vec::new()) {
            if !in_mst_set.contains(neighbor_id.as_str()) {
                priority_queue.push((*neighbor_weight, target_id.clone(), neighbor_id.clone())); // @step:relax-edge
                priority_queue.sort_by(|entryA, entryB| entryA.0.cmp(&entryB.0)); // @step:relax-edge
            }
        }
    }

    mst_edges // @step:complete
}
