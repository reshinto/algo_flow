include!("dfs.rs");

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
    fn traverses_linear_graph_in_order() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &["D"]), ("D", &[])]);
        assert_eq!(depth_first_search(&adj, "A"), to_strings(&["A","B","C","D"]));
    }

    #[test]
    fn handles_disconnected_graph_visiting_only_reachable_nodes() {
        let adj = make_adj(&[("A", &["B"]), ("B", &[]), ("C", &["D"]), ("D", &[])]);
        let result = depth_first_search(&adj, "A");
        assert_eq!(result, to_strings(&["A","B"]));
        assert!(!result.contains(&"C".to_string()));
    }

    #[test]
    fn handles_single_node_graph() {
        let adj = make_adj(&[("A", &[])]);
        assert_eq!(depth_first_search(&adj, "A"), to_strings(&["A"]));
    }

    #[test]
    fn does_not_visit_same_node_twice_in_cyclic_graph() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &["A"])]);
        let result = depth_first_search(&adj, "A");
        assert_eq!(result.len(), 3);
        let result_set: std::collections::HashSet<_> = result.iter().collect();
        let expected_set: std::collections::HashSet<_> = to_strings(&["A","B","C"]).iter().collect();
        assert_eq!(result_set, expected_set);
    }

    #[test]
    fn handles_fully_connected_graph_without_revisiting_nodes() {
        let adj = make_adj(&[
            ("A", &["B","C","D"]), ("B", &["A","C","D"]),
            ("C", &["A","B","D"]), ("D", &["A","B","C"]),
        ]);
        let result = depth_first_search(&adj, "A");
        assert_eq!(result.len(), 4);
        assert_eq!(result[0], "A");
    }

    #[test]
    fn handles_node_with_no_neighbors_in_adjacency_list() {
        let adj = make_adj(&[("A", &["B"])]);
        assert_eq!(depth_first_search(&adj, "A"), to_strings(&["A","B"]));
    }

    #[test]
    fn traverses_diamond_shaped_graph_visiting_each_node_exactly_once() {
        let adj = make_adj(&[("A", &["B","C"]), ("B", &["D"]), ("C", &["D"]), ("D", &[])]);
        let result = depth_first_search(&adj, "A");
        assert_eq!(result.len(), 4);
        assert_eq!(result[0], "A");
        let result_set: std::collections::HashSet<_> = result.iter().collect();
        let expected_set: std::collections::HashSet<_> = to_strings(&["A","B","C","D"]).iter().collect();
        assert_eq!(result_set, expected_set);
    }
}
