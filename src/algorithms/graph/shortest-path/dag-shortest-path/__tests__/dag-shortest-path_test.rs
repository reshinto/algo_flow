include!("../sources/dag-shortest-path.rs");

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
    fn computes_shortest_distances_in_simple_dag() {
        let adj = make_adj(&[
            ("A", &[("B", 2), ("C", 6)]),
            ("B", &[("D", 1), ("E", 4)]),
            ("C", &[("E", 2)]),
            ("D", &[("F", 5)]),
            ("E", &[("F", 1)]),
            ("F", &[]),
        ]);
        let result = dag_shortest_path(&adj, "A", &to_strings(&["A", "B", "C", "D", "E", "F"]));
        assert_eq!(result["A"], 0);
        assert_eq!(result["B"], 2);
        assert_eq!(result["C"], 6);
        assert_eq!(result["D"], 3);
        assert_eq!(result["E"], 6);
        assert_eq!(result["F"], 7);
    }

    #[test]
    fn returns_zero_distance_for_start_node() {
        let adj = make_adj(&[("Start", &[("End", 5)]), ("End", &[])]);
        let result = dag_shortest_path(&adj, "Start", &to_strings(&["Start", "End"]));
        assert_eq!(result["Start"], 0);
    }

    #[test]
    fn returns_max_for_unreachable_nodes() {
        let adj = make_adj(&[("A", &[("B", 3)]), ("B", &[]), ("C", &[("D", 2)]), ("D", &[])]);
        let result = dag_shortest_path(&adj, "A", &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result["A"], 0);
        assert_eq!(result["B"], 3);
        assert_eq!(result["C"], i64::MAX);
        assert_eq!(result["D"], i64::MAX);
    }

    #[test]
    fn handles_single_node_graph() {
        let adj = make_adj(&[("A", &[])]);
        let result = dag_shortest_path(&adj, "A", &to_strings(&["A"]));
        assert_eq!(result["A"], 0);
    }

    #[test]
    fn handles_linear_chain_correctly() {
        let adj = make_adj(&[
            ("A", &[("B", 3)]), ("B", &[("C", 4)]), ("C", &[("D", 2)]), ("D", &[]),
        ]);
        let result = dag_shortest_path(&adj, "A", &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result["B"], 3);
        assert_eq!(result["C"], 7);
        assert_eq!(result["D"], 9);
    }

    #[test]
    fn handles_negative_edge_weights_correctly() {
        let adj = make_adj(&[("A", &[("B", 2), ("C", 4)]), ("B", &[("C", -3)]), ("C", &[])]);
        let result = dag_shortest_path(&adj, "A", &to_strings(&["A", "B", "C"]));
        assert_eq!(result["A"], 0);
        assert_eq!(result["B"], 2);
        assert_eq!(result["C"], -1);
    }

    #[test]
    fn selects_shorter_of_two_converging_paths() {
        let adj = make_adj(&[
            ("A", &[("B", 1), ("C", 10)]), ("B", &[("D", 2)]), ("C", &[("D", 1)]), ("D", &[]),
        ]);
        let result = dag_shortest_path(&adj, "A", &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result["D"], 3);
    }
}
