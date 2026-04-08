include!("sources/dfs-cycle-directed.rs");

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
    fn detects_simple_back_edge_cycle() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &["A"])]);
        assert!(dfs_cycle_directed(&adj, &to_strings(&["A", "B", "C"])));
    }

    #[test]
    fn returns_false_for_simple_dag() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &["D"]), ("C", &["D"]), ("D", &[])]);
        assert!(!dfs_cycle_directed(&adj, &to_strings(&["A", "B", "C", "D"])));
    }

    #[test]
    fn detects_self_loop() {
        let adj = make_adj(&[("A", &["A"]), ("B", &[])]);
        assert!(dfs_cycle_directed(&adj, &to_strings(&["A", "B"])));
    }

    #[test]
    fn returns_false_for_single_node_with_no_edges() {
        let adj = make_adj(&[("A", &[])]);
        assert!(!dfs_cycle_directed(&adj, &to_strings(&["A"])));
    }

    #[test]
    fn detects_cycle_in_default_5_node_graph() {
        let adj = make_adj(&[
            ("A", &["B"]), ("B", &["C"]), ("C", &["D"]), ("D", &["B"]), ("E", &["A"]),
        ]);
        assert!(dfs_cycle_directed(&adj, &to_strings(&["A", "B", "C", "D", "E"])));
    }

    #[test]
    fn returns_false_for_linear_directed_chain() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &["D"]), ("D", &[])]);
        assert!(!dfs_cycle_directed(&adj, &to_strings(&["A", "B", "C", "D"])));
    }

    #[test]
    fn returns_false_for_disconnected_acyclic_graph() {
        let adj = make_adj(&[("A", &["B"]), ("B", &[]), ("C", &["D"]), ("D", &[])]);
        assert!(!dfs_cycle_directed(&adj, &to_strings(&["A", "B", "C", "D"])));
    }

    #[test]
    fn detects_cycle_in_disconnected_graph_where_only_one_component_has_cycle() {
        let adj = make_adj(&[("A", &["B"]), ("B", &[]), ("C", &["D"]), ("D", &["C"])]);
        assert!(dfs_cycle_directed(&adj, &to_strings(&["A", "B", "C", "D"])));
    }

    #[test]
    fn handles_cross_edge_correctly_no_false_positive() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &["D"]), ("C", &["D"]), ("D", &[])]);
        assert!(!dfs_cycle_directed(&adj, &to_strings(&["A", "B", "C", "D"])));
    }
}
