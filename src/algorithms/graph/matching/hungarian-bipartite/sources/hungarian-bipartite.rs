// Hungarian Bipartite Matching (Kuhn's Algorithm) — maximum matching via augmenting paths
use std::collections::{HashMap, HashSet};

pub fn hungarian_matching(
    adjacency_list: &HashMap<String, Vec<String>>,
    left_nodes: &[String],
    _right_nodes: &[String],
) -> HashMap<String, String> {
    let mut match_left: HashMap<String, String> = HashMap::new(); // @step:initialize
    let mut match_right: HashMap<String, String> = HashMap::new(); // @step:initialize

    for left_node in left_nodes {
        // @step:initialize
        let mut visited_right: HashSet<String> = HashSet::new(); // @step:initialize
        try_augment(
            left_node,
            adjacency_list,
            &mut match_left,
            &mut match_right,
            &mut visited_right,
        ); // @step:visit
    }

    match_left // @step:complete
}

fn try_augment(
    left_node: &str,
    adjacency_list: &HashMap<String, Vec<String>>,
    match_left: &mut HashMap<String, String>,
    match_right: &mut HashMap<String, String>,
    visited_right: &mut HashSet<String>,
) -> bool {
    let empty_vec = Vec::new();
    let neighbors = adjacency_list.get(left_node).unwrap_or(&empty_vec).clone(); // @step:visit-edge
    for right_node in &neighbors {
        // @step:visit-edge
        if visited_right.contains(right_node.as_str()) {
            continue; // @step:visit-edge
        }
        visited_right.insert(right_node.clone()); // @step:visit-edge

        let current_owner = match_right.get(right_node).cloned(); // @step:visit-edge
        let can_augment = match current_owner {
            None => true,
            Some(ref owner) => try_augment(owner, adjacency_list, match_left, match_right, visited_right),
        };
        if can_augment {
            match_left.insert(left_node.to_string(), right_node.clone()); // @step:match-edge
            match_right.insert(right_node.clone(), left_node.to_string()); // @step:match-edge
            return true; // @step:match-edge
        }
    }
    false // @step:visit-edge
}
