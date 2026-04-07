include!("dijkstra.rs");

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

    #[test]
    fn computes_shortest_distances_in_simple_weighted_graph() {
        let adj = make_adj(&[
            ("A", &[("B", 4), ("C", 2)]),
            ("B", &[("D", 5)]),
            ("C", &[("B", 1), ("D", 8)]),
            ("D", &[]),
        ]);
        let result = dijkstra_shortest_path(&adj, "A");
        assert_eq!(result["A"], 0);
        assert_eq!(result["B"], 3);
        assert_eq!(result["C"], 2);
        assert_eq!(result["D"], 8);
    }

    #[test]
    fn returns_zero_distance_for_start_node() {
        let adj = make_adj(&[("X", &[("Y", 10)]), ("Y", &[])]);
        let result = dijkstra_shortest_path(&adj, "X");
        assert_eq!(result["X"], 0);
    }

    #[test]
    fn returns_max_for_unreachable_nodes() {
        let adj = make_adj(&[("A", &[("B", 1)]), ("B", &[]), ("C", &[])]);
        let result = dijkstra_shortest_path(&adj, "A");
        assert_eq!(result["C"], i64::MAX);
    }

    #[test]
    fn handles_single_node_graph() {
        let adj = make_adj(&[("A", &[])]);
        let result = dijkstra_shortest_path(&adj, "A");
        assert_eq!(result["A"], 0);
    }

    #[test]
    fn finds_shortest_path_through_multiple_hops() {
        let adj = make_adj(&[
            ("A", &[("B", 4), ("C", 2)]),
            ("B", &[("D", 5)]),
            ("C", &[("B", 1), ("D", 8), ("E", 10)]),
            ("D", &[("F", 2)]),
            ("E", &[("F", 3)]),
            ("F", &[]),
        ]);
        let result = dijkstra_shortest_path(&adj, "A");
        assert_eq!(result["C"], 2);
        assert_eq!(result["B"], 3);
        assert_eq!(result["D"], 8);
        assert_eq!(result["F"], 10);
        assert_eq!(result["E"], 12);
    }

    #[test]
    fn uses_lower_weight_path_over_direct_path() {
        let adj = make_adj(&[
            ("A", &[("B", 10), ("C", 1)]),
            ("B", &[("D", 1)]),
            ("C", &[("B", 1), ("D", 5)]),
            ("D", &[]),
        ]);
        let result = dijkstra_shortest_path(&adj, "A");
        assert_eq!(result["D"], 3);
    }

    #[test]
    fn handles_linear_chain_correctly() {
        let adj = make_adj(&[
            ("A", &[("B", 2)]), ("B", &[("C", 3)]), ("C", &[("D", 4)]), ("D", &[]),
        ]);
        let result = dijkstra_shortest_path(&adj, "A");
        assert_eq!(result["B"], 2);
        assert_eq!(result["C"], 5);
        assert_eq!(result["D"], 9);
    }

    #[test]
    fn handles_equal_weight_edges() {
        let adj = make_adj(&[
            ("A", &[("B", 1), ("C", 1)]),
            ("B", &[("D", 1)]),
            ("C", &[("D", 1)]),
            ("D", &[]),
        ]);
        let result = dijkstra_shortest_path(&adj, "A");
        assert_eq!(result["D"], 2);
    }
}
