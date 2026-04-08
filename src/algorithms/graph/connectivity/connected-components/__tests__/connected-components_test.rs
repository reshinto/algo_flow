include!("../sources/connected-components.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn make_adj(pairs: &[(&str, &[&str])]) -> HashMap<String, Vec<String>> {
        pairs
            .iter()
            .map(|(node, neighbors)| {
                (
                    node.to_string(),
                    neighbors.iter().map(|n| n.to_string()).collect(),
                )
            })
            .collect()
    }

    fn to_strings(slice: &[&str]) -> Vec<String> {
        slice.iter().map(|s| s.to_string()).collect()
    }

    fn to_frozenset(comp: &[String]) -> std::collections::HashSet<String> {
        comp.iter().cloned().collect()
    }

    #[test]
    fn finds_three_disconnected_components() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]),
            ("B", &["A", "C"]),
            ("C", &["B"]),
            ("D", &["E"]),
            ("E", &["D"]),
            ("F", &[]),
        ]);
        let result = connected_components(
            &adjacency_list,
            &to_strings(&["A", "B", "C", "D", "E", "F"]),
        );
        assert_eq!(result.len(), 3);
        let sets: Vec<_> = result.iter().map(|c| to_frozenset(c)).collect();
        assert!(sets.contains(&to_strings(&["A", "B", "C"]).into_iter().collect()));
        assert!(sets.contains(&to_strings(&["D", "E"]).into_iter().collect()));
        assert!(sets.contains(&to_strings(&["F"]).into_iter().collect()));
    }

    #[test]
    fn returns_single_component_for_fully_connected_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B", "C"]),
            ("B", &["A", "C"]),
            ("C", &["A", "B"]),
        ]);
        let result = connected_components(&adjacency_list, &to_strings(&["A", "B", "C"]));
        assert_eq!(result.len(), 1);
        assert_eq!(to_frozenset(&result[0]), to_strings(&["A", "B", "C"]).into_iter().collect());
    }

    #[test]
    fn returns_each_node_as_own_component_when_no_edges() {
        let adjacency_list = make_adj(&[("A", &[]), ("B", &[]), ("C", &[])]);
        let result = connected_components(&adjacency_list, &to_strings(&["A", "B", "C"]));
        assert_eq!(result.len(), 3);
        for comp in &result {
            assert_eq!(comp.len(), 1);
        }
    }

    #[test]
    fn handles_single_node_graph() {
        let adjacency_list = make_adj(&[("A", &[])]);
        let result = connected_components(&adjacency_list, &to_strings(&["A"]));
        assert_eq!(result.len(), 1);
        assert_eq!(result[0], vec!["A".to_string()]);
    }

    #[test]
    fn handles_linear_chain_as_single_component() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]),
            ("B", &["A", "C"]),
            ("C", &["B", "D"]),
            ("D", &["C"]),
        ]);
        let result = connected_components(&adjacency_list, &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result.len(), 1);
        assert_eq!(
            to_frozenset(&result[0]),
            to_strings(&["A", "B", "C", "D"]).into_iter().collect()
        );
    }

    #[test]
    fn assigns_all_nodes_to_components_with_no_node_repeated() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]),
            ("B", &["A"]),
            ("C", &["D"]),
            ("D", &["C"]),
            ("E", &[]),
        ]);
        let node_ids = to_strings(&["A", "B", "C", "D", "E"]);
        let result = connected_components(&adjacency_list, &node_ids);
        let all_assigned: Vec<_> = result.iter().flatten().cloned().collect();
        assert_eq!(all_assigned.len(), node_ids.len());
        let assigned_set: std::collections::HashSet<_> = all_assigned.into_iter().collect();
        let expected_set: std::collections::HashSet<_> = node_ids.into_iter().collect();
        assert_eq!(assigned_set, expected_set);
    }

    #[test]
    fn correctly_identifies_3_component_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]),
            ("B", &["A", "C"]),
            ("C", &["B"]),
            ("D", &["E"]),
            ("E", &["D"]),
            ("F", &["G"]),
            ("G", &["F", "H"]),
            ("H", &["G"]),
        ]);
        let result = connected_components(
            &adjacency_list,
            &to_strings(&["A", "B", "C", "D", "E", "F", "G", "H"]),
        );
        assert_eq!(result.len(), 3);
        let sets: Vec<_> = result.iter().map(|c| to_frozenset(c)).collect();
        assert!(sets.contains(&to_strings(&["A", "B", "C"]).into_iter().collect()));
        assert!(sets.contains(&to_strings(&["D", "E"]).into_iter().collect()));
        assert!(sets.contains(&to_strings(&["F", "G", "H"]).into_iter().collect()));
    }
}
