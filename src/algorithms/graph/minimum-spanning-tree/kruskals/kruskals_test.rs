include!("sources/kruskals.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_edges(triples: &[(&str, &str, i64)]) -> Vec<WeightedEdge> {
        triples
            .iter()
            .map(|(src, tgt, w)| WeightedEdge {
                source: src.to_string(),
                target: tgt.to_string(),
                weight: *w,
            })
            .collect()
    }

    fn to_strings(slice: &[&str]) -> Vec<String> {
        slice.iter().map(|s| s.to_string()).collect()
    }

    fn total_weight(edges: &[(String, String, i64)]) -> i64 {
        edges.iter().map(|(_, _, w)| w).sum()
    }

    #[test]
    fn finds_correct_mst_for_default_6_node_weighted_graph() {
        let edges = make_edges(&[
            ("A", "B", 4), ("A", "C", 2), ("B", "C", 1), ("B", "D", 5),
            ("C", "D", 8), ("C", "E", 10), ("D", "E", 2), ("D", "F", 6), ("E", "F", 3),
        ]);
        let result = kruskals_algorithm(&edges, &to_strings(&["A", "B", "C", "D", "E", "F"]));
        assert_eq!(result.len(), 5);
        assert_eq!(total_weight(&result), 13);
    }

    #[test]
    fn returns_v_minus_1_edges_for_connected_graph() {
        let edges = make_edges(&[("A", "B", 3), ("A", "C", 1), ("B", "C", 2)]);
        let result = kruskals_algorithm(&edges, &to_strings(&["A", "B", "C"]));
        assert_eq!(result.len(), 2);
    }

    #[test]
    fn selects_edges_in_ascending_weight_order() {
        let edges = make_edges(&[("A", "B", 10), ("B", "C", 1), ("A", "C", 5)]);
        let result = kruskals_algorithm(&edges, &to_strings(&["A", "B", "C"]));
        assert_eq!(result.len(), 2);
        let mut weights: Vec<i64> = result.iter().map(|(_, _, w)| *w).collect();
        weights.sort();
        assert_eq!(weights[0], 1);
        assert_eq!(weights[1], 5);
    }

    #[test]
    fn rejects_edges_that_would_form_cycle() {
        let edges = make_edges(&[("A", "B", 1), ("B", "C", 2), ("A", "C", 3)]);
        let result = kruskals_algorithm(&edges, &to_strings(&["A", "B", "C"]));
        assert_eq!(result.len(), 2);
        assert_eq!(total_weight(&result), 3);
    }

    #[test]
    fn handles_two_node_graph_with_single_edge() {
        let edges = make_edges(&[("A", "B", 7)]);
        let result = kruskals_algorithm(&edges, &to_strings(&["A", "B"]));
        assert_eq!(result.len(), 1);
        assert_eq!(result[0].2, 7);
    }

    #[test]
    fn handles_linear_chain_graph_correctly() {
        let edges = make_edges(&[("A", "B", 2), ("B", "C", 4), ("C", "D", 1)]);
        let result = kruskals_algorithm(&edges, &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result.len(), 3);
        assert_eq!(total_weight(&result), 7);
    }

    #[test]
    fn produces_mst_with_minimum_total_weight() {
        let edges = make_edges(&[
            ("A", "B", 1), ("B", "C", 1), ("C", "D", 1), ("D", "A", 1), ("A", "C", 10),
        ]);
        let result = kruskals_algorithm(&edges, &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result.len(), 3);
        assert_eq!(total_weight(&result), 3);
    }
}
