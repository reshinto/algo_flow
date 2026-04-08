// Floyd-Warshall — computes all-pairs shortest paths via dynamic programming
use std::collections::HashMap;

pub fn floyd_warshall(
    adjacency_list: &HashMap<String, Vec<(String, i64)>>,
    node_ids: &[String],
) -> HashMap<String, HashMap<String, i64>> {
    // Initialize distance matrix
    let mut distances: HashMap<String, HashMap<String, i64>> = HashMap::new(); // @step:initialize

    for source_id in node_ids {
        let row = distances.entry(source_id.clone()).or_default();
        for target_id in node_ids {
            if source_id == target_id {
                row.insert(target_id.clone(), 0); // @step:initialize
            } else {
                row.insert(target_id.clone(), i64::MAX); // @step:initialize
            }
        }
    }

    // Set direct edge weights
    for source_id in node_ids {
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(source_id).unwrap_or(&empty_vec).clone();
        for (target_id, edge_weight) in &neighbors {
            if let Some(row) = distances.get_mut(source_id) {
                row.insert(target_id.clone(), *edge_weight); // @step:initialize
            }
        }
    }

    // Triple nested loop: try every intermediate node
    let node_ids_vec = node_ids.to_vec();
    for intermediate_id in &node_ids_vec {
        for source_id in &node_ids_vec {
            for target_id in &node_ids_vec {
                let through_source = *distances
                    .get(source_id)
                    .and_then(|row| row.get(intermediate_id))
                    .unwrap_or(&i64::MAX);
                let through_target = *distances
                    .get(intermediate_id)
                    .and_then(|row| row.get(target_id))
                    .unwrap_or(&i64::MAX);
                let through_intermediate = if through_source == i64::MAX || through_target == i64::MAX {
                    i64::MAX
                } else {
                    through_source + through_target
                }; // @step:relax-edge
                let current = *distances
                    .get(source_id)
                    .and_then(|row| row.get(target_id))
                    .unwrap_or(&i64::MAX);
                if through_intermediate < current {
                    distances
                        .entry(source_id.clone())
                        .or_default()
                        .insert(target_id.clone(), through_intermediate); // @step:update-distance
                }
            }
        }
    }

    distances // @step:complete
}
