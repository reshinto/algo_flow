include!("../sources/floyd-warshall.rs");

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

    fn to_strings(slice: &[&str]) -> Vec<String> {
        slice.iter().map(|s| s.to_string()).collect()
    }

    #[test]
    fn computes_all_pairs_shortest_paths_in_4_node_graph() {
        let adj = make_adj(&[
            ("A", &[("B", 3), ("D", -4)]),
            ("B", &[]),
            ("C", &[("B", -5)]),
            ("D", &[("C", 6)]),
        ]);
        let result = floyd_warshall(&adj, &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result["A"]["A"], 0);
        assert_eq!(result["A"]["B"], -3);
        assert_eq!(result["A"]["C"], 2);
        assert_eq!(result["B"]["B"], 0);
    }

    #[test]
    fn sets_diagonal_entries_to_zero() {
        let adj = make_adj(&[("X", &[("Y", 2)]), ("Y", &[("Z", 3)]), ("Z", &[])]);
        let result = floyd_warshall(&adj, &to_strings(&["X", "Y", "Z"]));
        assert_eq!(result["X"]["X"], 0);
        assert_eq!(result["Y"]["Y"], 0);
        assert_eq!(result["Z"]["Z"], 0);
    }

    #[test]
    fn returns_max_for_unreachable_node_pairs() {
        let adj = make_adj(&[("A", &[("B", 1)]), ("B", &[]), ("C", &[])]);
        let result = floyd_warshall(&adj, &to_strings(&["A", "B", "C"]));
        assert_eq!(result["A"]["C"], i64::MAX);
        assert_eq!(result["C"]["A"], i64::MAX);
    }

    #[test]
    fn handles_single_node_graph() {
        let adj = make_adj(&[("A", &[])]);
        let result = floyd_warshall(&adj, &to_strings(&["A"]));
        assert_eq!(result["A"]["A"], 0);
    }

    #[test]
    fn finds_shorter_indirect_paths_over_direct_edges() {
        let adj = make_adj(&[("A", &[("B", 1), ("C", 10)]), ("B", &[("C", 2)]), ("C", &[])]);
        let result = floyd_warshall(&adj, &to_strings(&["A", "B", "C"]));
        assert_eq!(result["A"]["C"], 3);
    }

    #[test]
    fn computes_correct_bidirectional_distances() {
        let adj = make_adj(&[("A", &[("B", 4)]), ("B", &[("A", 4), ("C", 3)]), ("C", &[("B", 3)])]);
        let result = floyd_warshall(&adj, &to_strings(&["A", "B", "C"]));
        assert_eq!(result["A"]["C"], 7);
        assert_eq!(result["C"]["A"], 7);
    }

    #[test]
    fn handles_negative_edge_weights_without_negative_cycles() {
        let adj = make_adj(&[("A", &[("B", 5)]), ("B", &[("C", -2)]), ("C", &[])]);
        let result = floyd_warshall(&adj, &to_strings(&["A", "B", "C"]));
        assert_eq!(result["A"]["C"], 3);
        assert_eq!(result["A"]["B"], 5);
    }
}
