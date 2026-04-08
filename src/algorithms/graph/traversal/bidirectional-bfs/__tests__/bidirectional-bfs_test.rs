include!("../sources/bidirectional-bfs.rs");

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
    fn finds_shortest_path_in_simple_linear_graph() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &["D"]), ("D", &[])]);
        assert_eq!(bidirectional_bfs(&adj, "A", "D"), Some(to_strings(&["A","B","C","D"])));
    }

    #[test]
    fn finds_path_in_branching_graph() {
        let adj = make_adj(&[
            ("A", &["B","C"]), ("B", &["D"]), ("C", &["E"]),
            ("D", &["F"]), ("E", &["F"]), ("F", &[]),
        ]);
        let result = bidirectional_bfs(&adj, "A", "F");
        assert!(result.is_some());
        let path = result.unwrap();
        assert_eq!(path[0], "A");
        assert_eq!(path[path.len()-1], "F");
    }

    #[test]
    fn returns_none_when_no_path_exists() {
        let adj = make_adj(&[("A", &["B"]), ("B", &[]), ("C", &["D"]), ("D", &[])]);
        assert_eq!(bidirectional_bfs(&adj, "A", "C"), None);
    }

    #[test]
    fn returns_single_element_path_when_start_equals_target() {
        let adj = make_adj(&[("A", &["B"]), ("B", &[])]);
        assert_eq!(bidirectional_bfs(&adj, "A", "A"), Some(to_strings(&["A"])));
    }

    #[test]
    fn finds_shortest_path_not_longer_one() {
        let adj = make_adj(&[
            ("A", &["B"]), ("B", &["C","E"]), ("C", &["D"]), ("D", &["E"]), ("E", &[]),
        ]);
        let result = bidirectional_bfs(&adj, "A", "E");
        assert!(result.is_some());
        let path = result.unwrap();
        assert_eq!(path.len(), 3);
        assert_eq!(path[0], "A");
        assert_eq!(path[path.len()-1], "E");
    }

    #[test]
    fn handles_adjacent_start_and_target_nodes() {
        let adj = make_adj(&[("A", &["B"]), ("B", &[])]);
        assert_eq!(bidirectional_bfs(&adj, "A", "B"), Some(to_strings(&["A","B"])));
    }

    #[test]
    fn treats_graph_as_undirected_for_backward_frontier() {
        let adj = make_adj(&[("A", &["B"]), ("B", &[])]);
        let result = bidirectional_bfs(&adj, "B", "A");
        assert!(result.is_some());
        assert_eq!(result.unwrap().len(), 2);
    }

    #[test]
    fn returns_none_for_isolated_start_node() {
        let adj = make_adj(&[("A", &[]), ("B", &["C"]), ("C", &[])]);
        assert_eq!(bidirectional_bfs(&adj, "A", "C"), None);
    }
}
