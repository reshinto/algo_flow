include!("sources/prims.rs");

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

    fn total_weight(edges: &[MstEdge]) -> i64 {
        edges.iter().map(|e| e.weight).sum()
    }

    #[test]
    fn finds_correct_mst_for_default_6_node_weighted_graph() {
        let adj = make_adj(&[
            ("A", &[("B", 4), ("C", 2)]),
            ("B", &[("A", 4), ("C", 1), ("D", 5)]),
            ("C", &[("A", 2), ("B", 1), ("D", 8), ("E", 10)]),
            ("D", &[("B", 5), ("C", 8), ("E", 2), ("F", 6)]),
            ("E", &[("C", 10), ("D", 2), ("F", 3)]),
            ("F", &[("D", 6), ("E", 3)]),
        ]);
        let result = prims_algorithm(&adj, "A");
        assert_eq!(result.len(), 5);
        assert_eq!(total_weight(&result), 13);
    }

    #[test]
    fn returns_v_minus_1_edges_for_fully_connected_graph() {
        let adj = make_adj(&[
            ("A", &[("B", 3), ("C", 1)]),
            ("B", &[("A", 3), ("C", 2)]),
            ("C", &[("A", 1), ("B", 2)]),
        ]);
        let result = prims_algorithm(&adj, "A");
        assert_eq!(result.len(), 2);
    }

    #[test]
    fn selects_minimum_weight_edge_at_each_step() {
        let adj = make_adj(&[
            ("A", &[("B", 10), ("C", 1)]),
            ("B", &[("A", 10), ("C", 2)]),
            ("C", &[("A", 1), ("B", 2)]),
        ]);
        let result = prims_algorithm(&adj, "A");
        assert_eq!(result.len(), 2);
        assert_eq!(total_weight(&result), 3);
    }

    #[test]
    fn does_not_revisit_already_included_nodes() {
        let adj = make_adj(&[
            ("A", &[("B", 1), ("C", 2)]),
            ("B", &[("A", 1), ("C", 3)]),
            ("C", &[("A", 2), ("B", 3)]),
        ]);
        let result = prims_algorithm(&adj, "A");
        let target_nodes: std::collections::HashSet<_> = result.iter().map(|e| &e.target).collect();
        assert_eq!(target_nodes.len(), result.len());
    }

    #[test]
    fn handles_linear_chain_graph_from_start_to_end() {
        let adj = make_adj(&[
            ("A", &[("B", 5)]),
            ("B", &[("A", 5), ("C", 3)]),
            ("C", &[("B", 3), ("D", 7)]),
            ("D", &[("C", 7)]),
        ]);
        let result = prims_algorithm(&adj, "A");
        assert_eq!(result.len(), 3);
        assert_eq!(total_weight(&result), 15);
    }

    #[test]
    fn produces_correct_mst_starting_from_non_first_node() {
        let adj = make_adj(&[
            ("A", &[("B", 1), ("C", 4)]),
            ("B", &[("A", 1), ("C", 2)]),
            ("C", &[("A", 4), ("B", 2)]),
        ]);
        let result_from_b = prims_algorithm(&adj, "B");
        let result_from_a = prims_algorithm(&adj, "A");
        assert_eq!(total_weight(&result_from_b), total_weight(&result_from_a));
    }

    #[test]
    fn handles_two_node_graph() {
        let adj = make_adj(&[("A", &[("B", 9)]), ("B", &[("A", 9)])]);
        let result = prims_algorithm(&adj, "A");
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].weight, 9);
    }
}
