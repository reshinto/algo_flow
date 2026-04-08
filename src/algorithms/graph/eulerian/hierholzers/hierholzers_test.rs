include!("sources/hierholzers.rs");

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

    fn is_valid_circuit(circuit: &[String], adjacency_list: &HashMap<String, Vec<String>>, start: &str) -> bool {
        if circuit.is_empty() { return false; }
        if circuit[0] != start { return false; }
        if circuit[circuit.len() - 1] != start { return false; }
        let total_edges: usize = adjacency_list.values().map(|v| v.len()).sum::<usize>() / 2;
        circuit.len() - 1 == total_edges
    }

    #[test]
    fn finds_eulerian_circuit_on_simple_triangle() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &["A", "C"]), ("C", &["B", "A"])]);
        let circuit = hierholzers_algorithm(&adj, "A");
        assert_eq!(circuit[0], "A");
        assert_eq!(circuit[circuit.len() - 1], "A");
        assert!(is_valid_circuit(&circuit, &adj, "A"));
    }

    #[test]
    fn finds_eulerian_circuit_on_default_5_node_graph() {
        let adj = make_adj(&[
            ("A", &["B", "C", "D", "E"]),
            ("B", &["A", "C"]),
            ("C", &["B", "A"]),
            ("D", &["A", "E"]),
            ("E", &["D", "A"]),
        ]);
        let circuit = hierholzers_algorithm(&adj, "A");
        assert_eq!(circuit[0], "A");
        assert_eq!(circuit[circuit.len() - 1], "A");
        assert!(is_valid_circuit(&circuit, &adj, "A"));
    }

    #[test]
    fn returns_single_node_circuit_for_graph_with_no_edges() {
        let adj = make_adj(&[("A", &[])]);
        let circuit = hierholzers_algorithm(&adj, "A");
        assert_eq!(circuit, vec!["A".to_string()]);
    }

    #[test]
    fn finds_eulerian_circuit_on_square() {
        let adj = make_adj(&[
            ("A", &["B", "D"]), ("B", &["A", "C"]), ("C", &["B", "D"]), ("D", &["C", "A"]),
        ]);
        let circuit = hierholzers_algorithm(&adj, "A");
        assert_eq!(circuit[0], "A");
        assert_eq!(circuit[circuit.len() - 1], "A");
        assert!(is_valid_circuit(&circuit, &adj, "A"));
    }

    #[test]
    fn finds_eulerian_circuit_on_two_triangles_sharing_a_node() {
        let adj = make_adj(&[
            ("A", &["B", "C", "D", "E"]),
            ("B", &["A", "C"]),
            ("C", &["B", "A"]),
            ("D", &["A", "E"]),
            ("E", &["D", "A"]),
        ]);
        let circuit = hierholzers_algorithm(&adj, "A");
        assert_eq!(circuit[0], "A");
        assert_eq!(circuit[circuit.len() - 1], "A");
        assert_eq!(circuit.len(), 7);
    }

    #[test]
    fn finds_eulerian_circuit_starting_from_non_hub_node() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &["A", "C"]), ("C", &["B", "A"])]);
        let circuit = hierholzers_algorithm(&adj, "B");
        assert_eq!(circuit[0], "B");
        assert_eq!(circuit[circuit.len() - 1], "B");
        assert_eq!(circuit.len(), 4);
    }

    #[test]
    fn produces_circuit_only_including_nodes_with_edges() {
        let adj = make_adj(&[("A", &["B", "C"]), ("B", &["A", "C"]), ("C", &["B", "A"])]);
        let circuit = hierholzers_algorithm(&adj, "A");
        let valid_nodes: std::collections::HashSet<&str> = ["A", "B", "C"].iter().copied().collect();
        for node_id in &circuit {
            assert!(valid_nodes.contains(node_id.as_str()));
        }
    }
}
