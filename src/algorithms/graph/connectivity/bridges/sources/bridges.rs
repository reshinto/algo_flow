// Bridges (Cut Edges) — finds all bridge edges in an undirected graph using DFS with low-link values
use std::collections::HashMap;

pub fn find_bridges(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> Vec<(String, String)> {
    let mut discovery_time: HashMap<String, u32> = HashMap::new(); // @step:initialize
    let mut low_link: HashMap<String, u32> = HashMap::new(); // @step:initialize
    let mut bridges: Vec<(String, String)> = Vec::new(); // @step:initialize
    let mut timer: u32 = 0; // @step:initialize

    fn dfs(
        node_id: &str,
        parent_id: Option<&str>,
        adjacency_list: &HashMap<String, Vec<String>>,
        discovery_time: &mut HashMap<String, u32>,
        low_link: &mut HashMap<String, u32>,
        bridges: &mut Vec<(String, String)>,
        timer: &mut u32,
    ) {
        discovery_time.insert(node_id.to_string(), *timer); // @step:visit
        low_link.insert(node_id.to_string(), *timer); // @step:visit
        *timer += 1; // @step:visit

        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(node_id).unwrap_or(&empty_vec);
        for neighbor_id in neighbors {
            if !discovery_time.contains_key(neighbor_id.as_str()) {
                dfs(
                    neighbor_id,
                    Some(node_id),
                    adjacency_list,
                    discovery_time,
                    low_link,
                    bridges,
                    timer,
                ); // @step:visit-edge
                let neighbor_low = *low_link.get(neighbor_id.as_str()).unwrap_or(&u32::MAX);
                let current_low = *low_link.get(node_id).unwrap_or(&u32::MAX);
                low_link.insert(node_id.to_string(), current_low.min(neighbor_low)); // @step:visit-edge

                let neighbor_low = *low_link.get(neighbor_id.as_str()).unwrap_or(&u32::MAX);
                let node_disc = *discovery_time.get(node_id).unwrap_or(&u32::MAX);
                if neighbor_low > node_disc {
                    bridges.push((node_id.to_string(), neighbor_id.clone())); // @step:mark-bridge
                }
            } else if Some(neighbor_id.as_str()) != parent_id {
                let neighbor_disc =
                    *discovery_time.get(neighbor_id.as_str()).unwrap_or(&u32::MAX);
                let current_low = *low_link.get(node_id).unwrap_or(&u32::MAX);
                low_link.insert(node_id.to_string(), current_low.min(neighbor_disc)); // @step:visit-edge
            }
        }
    }

    for node_id in node_ids {
        if !discovery_time.contains_key(node_id.as_str()) {
            dfs(
                node_id,
                None,
                adjacency_list,
                &mut discovery_time,
                &mut low_link,
                &mut bridges,
                &mut timer,
            ); // @step:initialize
        }
    }

    bridges // @step:complete
}
