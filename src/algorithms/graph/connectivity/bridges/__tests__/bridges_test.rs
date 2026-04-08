include!("../sources/bridges.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn make_adj(pairs: &[(&str, &[&str])]) -> HashMap<String, Vec<String>> {
        pairs
            .iter()
            .map(|(node, neighbors)| {
                (
                    node.to_string(),
                    neighbors.iter().map(|n| n.to_string()).collect(),
                )
            })
            .collect()
    }

    fn to_strings(slice: &[&str]) -> Vec<String> {
        slice.iter().map(|s| s.to_string()).collect()
    }

    fn bridge_set(bridge: &(String, String)) -> std::collections::HashSet<&str> {
        [bridge.0.as_str(), bridge.1.as_str()].iter().copied().collect()
    }

    #[test]
    fn finds_two_bridges_in_default_7_node_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B", "C"]),
            ("B", &["A", "C"]),
            ("C", &["B", "A", "D"]),
            ("D", &["C", "E"]),
            ("E", &["D", "F", "G"]),
            ("F", &["E", "G"]),
            ("G", &["F", "E"]),
        ]);
        let node_ids = to_strings(&["A", "B", "C", "D", "E", "F", "G"]);
        let result = find_bridges(&adjacency_list, &node_ids);
        assert_eq!(result.len(), 2, "Expected 2 bridges, got {:?}", result);
        let bridge_sets: Vec<_> = result.iter().map(bridge_set).collect();
        assert!(bridge_sets.contains(&["C", "D"].iter().copied().collect()));
        assert!(bridge_sets.contains(&["D", "E"].iter().copied().collect()));
    }

    #[test]
    fn returns_no_bridges_for_cycle_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B", "C"]),
            ("B", &["A", "C"]),
            ("C", &["A", "B"]),
        ]);
        let result = find_bridges(&adjacency_list, &to_strings(&["A", "B", "C"]));
        assert!(result.is_empty(), "Expected empty, got {:?}", result);
    }

    #[test]
    fn finds_single_bridge_in_two_node_graph() {
        let adjacency_list = make_adj(&[("A", &["B"]), ("B", &["A"])]);
        let result = find_bridges(&adjacency_list, &to_strings(&["A", "B"]));
        assert_eq!(result.len(), 1);
        assert_eq!(bridge_set(&result[0]), ["A", "B"].iter().copied().collect());
    }

    #[test]
    fn finds_all_edges_as_bridges_in_path_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]),
            ("B", &["A", "C"]),
            ("C", &["B", "D"]),
            ("D", &["C"]),
        ]);
        let result = find_bridges(&adjacency_list, &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result.len(), 3);
    }

    #[test]
    fn returns_empty_for_fully_connected_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B", "C", "D"]),
            ("B", &["A", "C", "D"]),
            ("C", &["A", "B", "D"]),
            ("D", &["A", "B", "C"]),
        ]);
        let result = find_bridges(&adjacency_list, &to_strings(&["A", "B", "C", "D"]));
        assert!(result.is_empty());
    }

    #[test]
    fn handles_disconnected_graph_with_bridges_in_each_component() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]),
            ("B", &["A"]),
            ("C", &["D"]),
            ("D", &["C"]),
        ]);
        let result = find_bridges(&adjacency_list, &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result.len(), 2);
        let bridge_sets: Vec<_> = result.iter().map(bridge_set).collect();
        assert!(bridge_sets.contains(&["A", "B"].iter().copied().collect()));
        assert!(bridge_sets.contains(&["C", "D"].iter().copied().collect()));
    }

    #[test]
    fn returns_no_bridges_for_single_isolated_node() {
        let adjacency_list = make_adj(&[("A", &[])]);
        let result = find_bridges(&adjacency_list, &to_strings(&["A"]));
        assert!(result.is_empty());
    }
}
