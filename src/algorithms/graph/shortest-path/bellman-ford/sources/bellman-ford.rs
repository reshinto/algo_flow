// Bellman-Ford — finds shortest paths tolerating negative edge weights; detects negative cycles
use std::collections::HashMap;

pub fn bellman_ford(
    adjacency_list: &HashMap<String, Vec<(String, i64)>>,
    start_node_id: &str,
    node_ids: &[String],
) -> HashMap<String, i64> {
    let mut distances: HashMap<String, i64> = HashMap::new(); // @step:initialize

    for node_id in node_ids {
        distances.insert(node_id.clone(), i64::MAX); // @step:initialize
    }
    distances.insert(start_node_id.to_string(), 0); // @step:initialize

    let vertex_count = node_ids.len();

    // Relax all edges (V - 1) times
    for _pass_index in 0..vertex_count.saturating_sub(1) {
        for source_id in node_ids {
            let empty_vec = Vec::new();
            let neighbors = adjacency_list.get(source_id).unwrap_or(&empty_vec);
            for (target_id, edge_weight) in neighbors {
                let source_dist = *distances.get(source_id).unwrap_or(&i64::MAX);
                if source_dist == i64::MAX {
                    continue; // @step:visit-edge
                }
                let tentative_distance = source_dist + edge_weight; // @step:relax-edge
                let target_dist = *distances.get(target_id.as_str()).unwrap_or(&i64::MAX);
                if tentative_distance < target_dist {
                    distances.insert(target_id.clone(), tentative_distance); // @step:update-distance
                }
            }
        }
    }

    // Detect negative cycles — one more pass; any improvement means a negative cycle
    for source_id in node_ids {
        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(source_id).unwrap_or(&empty_vec);
        for (target_id, edge_weight) in neighbors {
            let source_dist = *distances.get(source_id).unwrap_or(&i64::MAX);
            if source_dist == i64::MAX {
                continue;
            }
            let target_dist = *distances.get(target_id.as_str()).unwrap_or(&i64::MAX);
            if source_dist + edge_weight < target_dist {
                distances.insert(target_id.clone(), i64::MIN); // @step:update-distance
            }
        }
    }

    distances // @step:complete
}
