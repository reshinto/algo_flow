include!("../sources/union-find-cycle.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn to_strings(slice: &[&str]) -> Vec<String> {
        slice.iter().map(|s| s.to_string()).collect()
    }

    fn make_edges(pairs: &[(&str, &str)]) -> Vec<Edge> {
        pairs
            .iter()
            .map(|(source, target)| Edge {
                source: source.to_string(),
                target: target.to_string(),
            })
            .collect()
    }

    #[test]
    fn detects_triangle_cycle() {
        let edges = make_edges(&[("A", "B"), ("B", "C"), ("C", "A")]);
        assert!(union_find_cycle(&edges, &to_strings(&["A", "B", "C"])));
    }

    #[test]
    fn returns_false_for_tree_with_no_cycle() {
        let edges = make_edges(&[("A", "B"), ("A", "C"), ("B", "D")]);
        assert!(!union_find_cycle(&edges, &to_strings(&["A", "B", "C", "D"])));
    }

    #[test]
    fn returns_false_for_empty_edge_list() {
        assert!(!union_find_cycle(&[], &to_strings(&["A", "B", "C"])));
    }

    #[test]
    fn returns_false_for_single_node_with_no_edges() {
        assert!(!union_find_cycle(&[], &to_strings(&["A"])));
    }

    #[test]
    fn detects_cycle_in_default_5_node_graph() {
        let edges = make_edges(&[("A", "B"), ("B", "C"), ("C", "D"), ("D", "A"), ("D", "E")]);
        assert!(union_find_cycle(&edges, &to_strings(&["A", "B", "C", "D", "E"])));
    }

    #[test]
    fn returns_false_for_linear_undirected_chain() {
        let edges = make_edges(&[("A", "B"), ("B", "C"), ("C", "D")]);
        assert!(!union_find_cycle(&edges, &to_strings(&["A", "B", "C", "D"])));
    }

    #[test]
    fn detects_cycle_when_cycle_forming_edge_is_last() {
        let edges = make_edges(&[("A", "B"), ("B", "C"), ("C", "D"), ("D", "E"), ("E", "A")]);
        assert!(union_find_cycle(&edges, &to_strings(&["A", "B", "C", "D", "E"])));
    }

    #[test]
    fn correctly_handles_star_graph_no_cycle() {
        let edges = make_edges(&[("A", "B"), ("A", "C"), ("A", "D"), ("A", "E")]);
        assert!(!union_find_cycle(&edges, &to_strings(&["A", "B", "C", "D", "E"])));
    }

    #[test]
    fn detects_multi_component_graph_where_only_one_has_cycle() {
        let edges = make_edges(&[("A", "B"), ("C", "D"), ("D", "E"), ("E", "C")]);
        assert!(union_find_cycle(&edges, &to_strings(&["A", "B", "C", "D", "E"])));
    }
}
