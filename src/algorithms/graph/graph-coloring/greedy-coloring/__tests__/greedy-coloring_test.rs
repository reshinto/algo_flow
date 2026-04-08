include!("../sources/greedy-coloring.rs");

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
    fn colors_single_node_with_color_0() {
        let adj = make_adj(&[("A", &[])]);
        let result = greedy_coloring(&adj, &to_strings(&["A"]));
        assert_eq!(result.get("A"), Some(&0));
    }

    #[test]
    fn colors_two_connected_nodes_with_different_colors() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["A"])]);
        let result = greedy_coloring(&adj, &to_strings(&["A", "B"]));
        assert_ne!(result.get("A"), result.get("B"));
    }

    #[test]
    fn colors_triangle_with_3_distinct_colors() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &["A", "C"]), ("C", &["A", "B"])]);
        let result = greedy_coloring(&adj, &to_strings(&["A", "B", "C"]));
        assert_ne!(result.get("A"), result.get("B"));
        assert_ne!(result.get("A"), result.get("C"));
        assert_ne!(result.get("B"), result.get("C"));
    }

    #[test]
    fn colors_bipartite_graph_with_at_most_2_colors() {
        let adj = make_adj(&[
            ("A", &["B", "D"]), ("B", &["A", "C"]),
            ("C", &["B", "D"]), ("D", &["C", "A"]),
        ]);
        let result = greedy_coloring(&adj, &to_strings(&["A", "B", "C", "D"]));
        let used_colors: std::collections::HashSet<_> = result.values().collect();
        assert!(used_colors.len() <= 2);
    }

    #[test]
    fn assigns_smallest_available_color() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["A", "C"]), ("C", &["B"])]);
        let result = greedy_coloring(&adj, &to_strings(&["A", "B", "C"]));
        assert_eq!(result.get("A"), Some(&0));
        assert_eq!(result.get("B"), Some(&1));
        assert_eq!(result.get("C"), Some(&0));
    }

    #[test]
    fn produces_valid_coloring_no_two_adjacent_nodes_share_color() {
        let adj = make_adj(&[
            ("A", &["B", "C"]), ("B", &["A", "C"]), ("C", &["A", "B", "D"]),
            ("D", &["C", "E", "F"]), ("E", &["D", "F"]), ("F", &["D", "E"]),
        ]);
        let result = greedy_coloring(&adj, &to_strings(&["A", "B", "C", "D", "E", "F"]));
        for (node_id, neighbors) in &adj {
            for neighbor_id in neighbors {
                assert_ne!(result.get(node_id), result.get(neighbor_id));
            }
        }
    }

    #[test]
    fn colors_disconnected_graph_isolated_nodes_get_color_0() {
        let adj = make_adj(&[("A", &[]), ("B", &[]), ("C", &[])]);
        let result = greedy_coloring(&adj, &to_strings(&["A", "B", "C"]));
        assert_eq!(result.get("A"), Some(&0));
        assert_eq!(result.get("B"), Some(&0));
        assert_eq!(result.get("C"), Some(&0));
    }
}
