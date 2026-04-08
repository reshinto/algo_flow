include!("../sources/bellman-ford.rs");

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
    fn computes_shortest_distances_with_positive_weights() {
        let adj = make_adj(&[
            ("A", &[("B", 4), ("C", 2)]),
            ("B", &[("D", 5)]),
            ("C", &[("B", 1), ("D", 8)]),
            ("D", &[]),
        ]);
        let result = bellman_ford(&adj, "A", &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result["A"], 0);
        assert_eq!(result["C"], 2);
        assert_eq!(result["B"], 3);
        assert_eq!(result["D"], 8);
    }

    #[test]
    fn returns_zero_for_start_node() {
        let adj = make_adj(&[("X", &[("Y", 3)]), ("Y", &[])]);
        let result = bellman_ford(&adj, "X", &to_strings(&["X", "Y"]));
        assert_eq!(result["X"], 0);
    }

    #[test]
    fn returns_max_for_unreachable_nodes() {
        let adj = make_adj(&[("A", &[("B", 1)]), ("B", &[]), ("C", &[])]);
        let result = bellman_ford(&adj, "A", &to_strings(&["A", "B", "C"]));
        assert_eq!(result["C"], i64::MAX);
    }

    #[test]
    fn handles_single_node_graph() {
        let adj = make_adj(&[("A", &[])]);
        let result = bellman_ford(&adj, "A", &to_strings(&["A"]));
        assert_eq!(result["A"], 0);
    }

    #[test]
    fn handles_linear_chain_with_mixed_weights() {
        let adj = make_adj(&[
            ("A", &[("B", 3)]),
            ("B", &[("C", -1)]),
            ("C", &[("D", 4)]),
            ("D", &[]),
        ]);
        let result = bellman_ford(&adj, "A", &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result["B"], 3);
        assert_eq!(result["C"], 2);
        assert_eq!(result["D"], 6);
    }

    #[test]
    fn marks_nodes_reachable_via_negative_cycle_as_min() {
        let adj = make_adj(&[
            ("A", &[("B", 1)]),
            ("B", &[("C", -3)]),
            ("C", &[("B", 1)]),
            ("D", &[]),
        ]);
        let result = bellman_ford(&adj, "A", &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result["B"], i64::MIN);
    }
}
