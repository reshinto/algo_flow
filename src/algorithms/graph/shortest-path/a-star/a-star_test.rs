include!("sources/a-star.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn make_adj(pairs: &[(&str, &[(&str, i64)])]) -> HashMap<String, Vec<(String, i64)>> {
        pairs
            .iter()
            .map(|(node, neighbors)| {
                (
                    node.to_string(),
                    neighbors.iter().map(|(n, w)| (n.to_string(), *w)).collect(),
                )
            })
            .collect()
    }

    fn make_heuristic(entries: &[(&str, i64)]) -> HashMap<String, i64> {
        entries.iter().map(|(node, val)| (node.to_string(), *val)).collect()
    }

    fn to_strings(slice: &[&str]) -> Vec<String> {
        slice.iter().map(|s| s.to_string()).collect()
    }

    #[test]
    fn finds_shortest_path_in_simple_weighted_graph() {
        let adj = make_adj(&[
            ("A", &[("B", 4), ("C", 2)]),
            ("B", &[("D", 5)]),
            ("C", &[("B", 1)]),
            ("D", &[]),
        ]);
        let heuristic = make_heuristic(&[("A", 10), ("B", 5), ("C", 7), ("D", 0)]);
        let result = a_star_search(&adj, "A", "D", &heuristic);
        assert!(result.is_some());
        let path = result.unwrap();
        assert_eq!(path[0], "A");
        assert_eq!(path[path.len() - 1], "D");
    }

    #[test]
    fn returns_single_element_path_when_start_equals_target() {
        let adj = make_adj(&[("A", &[("B", 3)]), ("B", &[])]);
        let heuristic = make_heuristic(&[("A", 0), ("B", 0)]);
        let result = a_star_search(&adj, "A", "A", &heuristic);
        assert_eq!(result, Some(to_strings(&["A"])));
    }

    #[test]
    fn returns_none_when_no_path_exists_to_target() {
        let adj = make_adj(&[("A", &[("B", 1)]), ("B", &[]), ("C", &[])]);
        let heuristic = make_heuristic(&[("A", 5), ("B", 3), ("C", 0)]);
        let result = a_star_search(&adj, "A", "C", &heuristic);
        assert!(result.is_none());
    }

    #[test]
    fn handles_two_node_graph_correctly() {
        let adj = make_adj(&[("Start", &[("End", 7)]), ("End", &[])]);
        let heuristic = make_heuristic(&[("Start", 7), ("End", 0)]);
        let result = a_star_search(&adj, "Start", "End", &heuristic);
        assert_eq!(result, Some(to_strings(&["Start", "End"])));
    }

    #[test]
    fn finds_path_through_6_node_graph() {
        let adj = make_adj(&[
            ("A", &[("B", 4), ("C", 2)]),
            ("B", &[("D", 5)]),
            ("C", &[("B", 1), ("E", 10)]),
            ("D", &[("F", 2)]),
            ("E", &[("F", 3)]),
            ("F", &[]),
        ]);
        let heuristic = make_heuristic(&[("A", 20), ("B", 10), ("C", 12), ("D", 5), ("E", 8), ("F", 0)]);
        let result = a_star_search(&adj, "A", "F", &heuristic);
        assert!(result.is_some());
        let path = result.unwrap();
        assert_eq!(path[0], "A");
        assert_eq!(path[path.len() - 1], "F");
    }

    #[test]
    fn correctly_prefers_heuristic_guided_path() {
        let adj = make_adj(&[
            ("A", &[("B", 1), ("C", 3)]),
            ("B", &[("D", 10)]),
            ("C", &[("D", 1)]),
            ("D", &[]),
        ]);
        let heuristic = make_heuristic(&[("A", 4), ("B", 10), ("C", 1), ("D", 0)]);
        let result = a_star_search(&adj, "A", "D", &heuristic);
        assert_eq!(result, Some(to_strings(&["A", "C", "D"])));
    }
}
