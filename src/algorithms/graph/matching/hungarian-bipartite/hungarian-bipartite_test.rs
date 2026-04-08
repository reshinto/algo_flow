include!("sources/hungarian-bipartite.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn make_adj(pairs: &[(&str, &[&str])]) -> HashMap<String, Vec<String>> {
        pairs
            .iter()
            .map(|(node, neighbors)| {
                (node.to_string(), neighbors.iter().map(|n| n.to_string()).collect())
            })
            .collect()
    }

    fn to_strings(slice: &[&str]) -> Vec<String> {
        slice.iter().map(|s| s.to_string()).collect()
    }

    #[test]
    fn finds_perfect_matching_for_fully_matchable_bipartite_graph() {
        let adj = make_adj(&[
            ("L1", &["R1", "R2"]), ("L2", &["R2", "R3"]), ("L3", &["R1", "R3"]),
            ("R1", &["L1", "L3"]), ("R2", &["L1", "L2"]), ("R3", &["L2", "L3"]),
        ]);
        let result = hungarian_matching(
            &adj,
            &to_strings(&["L1", "L2", "L3"]),
            &to_strings(&["R1", "R2", "R3"]),
        );
        assert_eq!(result.len(), 3);
        let right_values: std::collections::HashSet<_> = result.values().collect();
        assert_eq!(right_values.len(), result.len());
    }

    #[test]
    fn returns_partial_matching_when_not_all_left_nodes_can_be_matched() {
        let adj = make_adj(&[("L1", &["R1"]), ("L2", &["R1"]), ("R1", &["L1", "L2"])]);
        let result = hungarian_matching(
            &adj,
            &to_strings(&["L1", "L2"]),
            &to_strings(&["R1"]),
        );
        assert_eq!(result.len(), 1);
        let matched_right = result.values().next().unwrap();
        assert_eq!(matched_right, "R1");
    }

    #[test]
    fn returns_empty_matching_for_graph_with_no_edges() {
        let adj = make_adj(&[("L1", &[]), ("L2", &[]), ("R1", &[]), ("R2", &[])]);
        let result = hungarian_matching(
            &adj,
            &to_strings(&["L1", "L2"]),
            &to_strings(&["R1", "R2"]),
        );
        assert!(result.is_empty());
    }

    #[test]
    fn matches_single_left_right_pair_correctly() {
        let adj = make_adj(&[("L1", &["R1"]), ("R1", &["L1"])]);
        let result = hungarian_matching(&adj, &to_strings(&["L1"]), &to_strings(&["R1"]));
        assert_eq!(result.get("L1").map(|s| s.as_str()), Some("R1"));
        assert_eq!(result.len(), 1);
    }

    #[test]
    fn finds_augmenting_path_to_reroute_existing_match() {
        let adj = make_adj(&[
            ("L1", &["R1", "R2"]), ("L2", &["R1"]),
            ("R1", &["L1", "L2"]), ("R2", &["L1"]),
        ]);
        let result = hungarian_matching(
            &adj,
            &to_strings(&["L1", "L2"]),
            &to_strings(&["R1", "R2"]),
        );
        assert_eq!(result.len(), 2);
        let right_values: std::collections::HashSet<_> = result.values().collect();
        assert_eq!(right_values.len(), 2);
    }

    #[test]
    fn handles_one_to_one_bipartite_graph_with_guaranteed_perfect_matching() {
        let adj = make_adj(&[
            ("L1", &["R1"]), ("L2", &["R2"]), ("L3", &["R3"]),
            ("R1", &["L1"]), ("R2", &["L2"]), ("R3", &["L3"]),
        ]);
        let result = hungarian_matching(
            &adj,
            &to_strings(&["L1", "L2", "L3"]),
            &to_strings(&["R1", "R2", "R3"]),
        );
        assert_eq!(result.get("L1").map(|s| s.as_str()), Some("R1"));
        assert_eq!(result.get("L2").map(|s| s.as_str()), Some("R2"));
        assert_eq!(result.get("L3").map(|s| s.as_str()), Some("R3"));
    }

    #[test]
    fn returns_empty_matching_for_empty_graph_with_no_nodes() {
        let adj: HashMap<String, Vec<String>> = HashMap::new();
        let result = hungarian_matching(&adj, &[], &[]);
        assert!(result.is_empty());
    }
}
