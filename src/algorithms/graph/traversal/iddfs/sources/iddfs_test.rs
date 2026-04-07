include!("iddfs.rs");

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
    fn traverses_linear_graph_in_depth_first_order() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &["D"]), ("D", &[])]);
        assert_eq!(
            iterative_deepening_dfs(&adj, "A", None),
            to_strings(&["A", "B", "C", "D"])
        );
    }

    #[test]
    fn traverses_tree_graph_visiting_children_before_siblings() {
        let adj = make_adj(&[
            ("A", &["B", "C"]),
            ("B", &["D", "E"]),
            ("C", &["F"]),
            ("D", &[]),
            ("E", &[]),
            ("F", &[]),
        ]);
        let result = iterative_deepening_dfs(&adj, "A", None);
        assert_eq!(result.len(), 6);
        assert_eq!(result[0], "A");
        let result_set: std::collections::HashSet<_> = result.iter().collect();
        let expected_set: std::collections::HashSet<_> =
            to_strings(&["A", "B", "C", "D", "E", "F"]).iter().collect();
        assert_eq!(result_set, expected_set);
    }

    #[test]
    fn handles_disconnected_graph_visiting_only_reachable_nodes() {
        let adj = make_adj(&[("A", &["B"]), ("B", &[]), ("C", &["D"]), ("D", &[])]);
        let result = iterative_deepening_dfs(&adj, "A", None);
        assert!(result.contains(&"A".to_string()));
        assert!(result.contains(&"B".to_string()));
        assert!(!result.contains(&"C".to_string()));
        assert!(!result.contains(&"D".to_string()));
    }

    #[test]
    fn handles_single_node_graph() {
        let adj = make_adj(&[("A", &[])]);
        assert_eq!(iterative_deepening_dfs(&adj, "A", None), to_strings(&["A"]));
    }

    #[test]
    fn does_not_visit_same_node_twice_in_cyclic_graph() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &["A"])]);
        let result = iterative_deepening_dfs(&adj, "A", None);
        assert_eq!(result, to_strings(&["A", "B", "C"]));
        assert_eq!(result.len(), 3);
    }

    #[test]
    fn respects_explicit_max_depth() {
        let adj = make_adj(&[
            ("A", &["B", "C"]),
            ("B", &["D"]),
            ("C", &["E"]),
            ("D", &["F"]),
            ("E", &[]),
            ("F", &[]),
        ]);
        let result = iterative_deepening_dfs(&adj, "A", Some(1));
        assert!(result.contains(&"A".to_string()));
        assert!(result.contains(&"B".to_string()));
        assert!(result.contains(&"C".to_string()));
        assert!(!result.contains(&"D".to_string()));
        assert!(!result.contains(&"F".to_string()));
    }

    #[test]
    fn visits_neighbors_in_order_they_appear_in_adjacency_list() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &[]), ("C", &[])]);
        let result = iterative_deepening_dfs(&adj, "A", None);
        assert_eq!(result[0], "A");
        let result_set: std::collections::HashSet<_> = result.iter().collect();
        let expected_set: std::collections::HashSet<_> =
            to_strings(&["A", "B", "C"]).iter().collect();
        assert_eq!(result_set, expected_set);
    }

    #[test]
    fn traverses_fully_connected_graph_visiting_all_nodes() {
        let adj = make_adj(&[
            ("A", &["B", "C", "D"]),
            ("B", &["A", "C", "D"]),
            ("C", &["A", "B", "D"]),
            ("D", &["A", "B", "C"]),
        ]);
        let result = iterative_deepening_dfs(&adj, "A", None);
        assert_eq!(result.len(), 4);
        assert_eq!(result[0], "A");
        let result_set: std::collections::HashSet<_> = result.iter().collect();
        let expected_set: std::collections::HashSet<_> =
            to_strings(&["A", "B", "C", "D"]).iter().collect();
        assert_eq!(result_set, expected_set);
    }
}
