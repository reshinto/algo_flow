include!("bipartite-check.rs");

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
    fn identifies_simple_two_node_graph_as_bipartite() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["A"])]);
        let result = bipartite_check(&adj, &to_strings(&["A", "B"]));
        assert!(result.is_bipartite);
    }

    #[test]
    fn identifies_even_cycle_as_bipartite() {
        let adj = make_adj(&[
            ("A", &["B", "D"]), ("B", &["A", "C"]),
            ("C", &["B", "D"]), ("D", &["C", "A"]),
        ]);
        let result = bipartite_check(&adj, &to_strings(&["A", "B", "C", "D"]));
        assert!(result.is_bipartite);
    }

    #[test]
    fn identifies_odd_cycle_triangle_as_not_bipartite() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &["A", "C"]), ("C", &["A", "B"])]);
        let result = bipartite_check(&adj, &to_strings(&["A", "B", "C"]));
        assert!(!result.is_bipartite);
    }

    #[test]
    fn identifies_default_6_node_bipartite_graph_correctly() {
        let adj = make_adj(&[
            ("A", &["D", "E"]), ("B", &["D", "F"]), ("C", &["E", "F"]),
            ("D", &["A", "B"]), ("E", &["A", "C"]), ("F", &["B", "C"]),
        ]);
        let result = bipartite_check(&adj, &to_strings(&["A", "B", "C", "D", "E", "F"]));
        assert!(result.is_bipartite);
        assert_ne!(result.coloring.get("A"), result.coloring.get("D"));
        assert_ne!(result.coloring.get("A"), result.coloring.get("E"));
    }

    #[test]
    fn produces_valid_2_coloring_for_bipartite_graph() {
        let adj = make_adj(&[
            ("A", &["C", "D"]), ("B", &["C", "D"]),
            ("C", &["A", "B"]), ("D", &["A", "B"]),
        ]);
        let result = bipartite_check(&adj, &to_strings(&["A", "B", "C", "D"]));
        assert!(result.is_bipartite);
        for (node_id, neighbors) in &adj {
            for neighbor_id in neighbors {
                assert_ne!(
                    result.coloring.get(node_id),
                    result.coloring.get(neighbor_id)
                );
            }
        }
    }

    #[test]
    fn handles_disconnected_graph_where_all_components_are_bipartite() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["A"]), ("C", &["D"]), ("D", &["C"])]);
        let result = bipartite_check(&adj, &to_strings(&["A", "B", "C", "D"]));
        assert!(result.is_bipartite);
    }

    #[test]
    fn handles_single_isolated_node_as_bipartite() {
        let adj = make_adj(&[("A", &[])]);
        let result = bipartite_check(&adj, &to_strings(&["A"]));
        assert!(result.is_bipartite);
        assert_eq!(result.coloring.get("A"), Some(&0));
    }

    #[test]
    fn identifies_5_cycle_as_not_bipartite() {
        let adj = make_adj(&[
            ("A", &["B", "E"]), ("B", &["A", "C"]), ("C", &["B", "D"]),
            ("D", &["C", "E"]), ("E", &["D", "A"]),
        ]);
        let result = bipartite_check(&adj, &to_strings(&["A", "B", "C", "D", "E"]));
        assert!(!result.is_bipartite);
    }
}
