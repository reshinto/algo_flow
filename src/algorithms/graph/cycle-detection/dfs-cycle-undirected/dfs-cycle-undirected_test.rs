include!("sources/dfs-cycle-undirected.rs");

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
    fn detects_triangle_cycle() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &["A", "C"]), ("C", &["B", "A"])]);
        assert!(dfs_cycle_undirected(&adj, &to_strings(&["A", "B", "C"])));
    }

    #[test]
    fn returns_false_for_tree() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &["A", "D"]), ("C", &["A"]), ("D", &["B"])]);
        assert!(!dfs_cycle_undirected(&adj, &to_strings(&["A", "B", "C", "D"])));
    }

    #[test]
    fn returns_false_for_single_node() {
        let adj = make_adj(&[("A", &[])]);
        assert!(!dfs_cycle_undirected(&adj, &to_strings(&["A"])));
    }

    #[test]
    fn returns_false_for_two_disconnected_nodes() {
        let adj = make_adj(&[("A", &[]), ("B", &[])]);
        assert!(!dfs_cycle_undirected(&adj, &to_strings(&["A", "B"])));
    }

    #[test]
    fn detects_cycle_in_default_5_node_graph() {
        let adj = make_adj(&[
            ("A", &["B", "D"]), ("B", &["A", "C"]), ("C", &["B", "D"]),
            ("D", &["C", "A", "E"]), ("E", &["D"]),
        ]);
        assert!(dfs_cycle_undirected(&adj, &to_strings(&["A", "B", "C", "D", "E"])));
    }

    #[test]
    fn returns_false_for_linear_undirected_chain() {
        let adj = make_adj(&[
            ("A", &["B"]), ("B", &["A", "C"]), ("C", &["B", "D"]), ("D", &["C"]),
        ]);
        assert!(!dfs_cycle_undirected(&adj, &to_strings(&["A", "B", "C", "D"])));
    }

    #[test]
    fn detects_cycle_in_disconnected_graph_where_one_component_has_cycle() {
        let adj = make_adj(&[
            ("A", &["B"]), ("B", &["A"]),
            ("C", &["D", "E"]), ("D", &["C", "E"]), ("E", &["C", "D"]),
        ]);
        assert!(dfs_cycle_undirected(&adj, &to_strings(&["A", "B", "C", "D", "E"])));
    }

    #[test]
    fn does_not_treat_direct_parent_edge_as_back_edge() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["A"])]);
        assert!(!dfs_cycle_undirected(&adj, &to_strings(&["A", "B"])));
    }
}
