include!("kosaraju-scc.rs");

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

    fn comp_set(comp: &[String]) -> std::collections::HashSet<String> {
        comp.iter().cloned().collect()
    }

    #[test]
    fn finds_three_sccs_in_default_8_node_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]), ("B", &["C"]), ("C", &["A", "D"]),
            ("D", &["E"]), ("E", &["D", "F"]), ("F", &["G"]),
            ("G", &["H"]), ("H", &["F"]),
        ]);
        let node_ids = to_strings(&["A", "B", "C", "D", "E", "F", "G", "H"]);
        let result = kosaraju_scc(&adjacency_list, &node_ids);
        assert_eq!(result.len(), 3);
        let sets: Vec<_> = result.iter().map(|c| comp_set(c)).collect();
        assert!(sets.contains(&to_strings(&["A", "B", "C"]).into_iter().collect()));
        assert!(sets.contains(&to_strings(&["D", "E"]).into_iter().collect()));
        assert!(sets.contains(&to_strings(&["F", "G", "H"]).into_iter().collect()));
    }

    #[test]
    fn finds_single_scc_for_fully_cyclic_graph() {
        let adjacency_list = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &["A"])]);
        let result = kosaraju_scc(&adjacency_list, &to_strings(&["A", "B", "C"]));
        assert_eq!(result.len(), 1);
        assert_eq!(comp_set(&result[0]), to_strings(&["A", "B", "C"]).into_iter().collect());
    }

    #[test]
    fn returns_each_node_as_own_scc_for_dag() {
        let adjacency_list = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &[])]);
        let result = kosaraju_scc(&adjacency_list, &to_strings(&["A", "B", "C"]));
        assert_eq!(result.len(), 3);
        for comp in &result {
            assert_eq!(comp.len(), 1);
        }
    }

    #[test]
    fn handles_single_node_with_no_edges() {
        let adjacency_list = make_adj(&[("A", &[])]);
        let result = kosaraju_scc(&adjacency_list, &to_strings(&["A"]));
        assert_eq!(result.len(), 1);
        assert_eq!(result[0], vec!["A".to_string()]);
    }

    #[test]
    fn handles_disconnected_directed_graph_with_two_mutual_pairs() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]), ("B", &["A"]), ("C", &["D"]), ("D", &["C"]),
        ]);
        let result = kosaraju_scc(&adjacency_list, &to_strings(&["A", "B", "C", "D"]));
        assert_eq!(result.len(), 2);
        let sets: Vec<_> = result.iter().map(|c| comp_set(c)).collect();
        assert!(sets.contains(&to_strings(&["A", "B"]).into_iter().collect()));
        assert!(sets.contains(&to_strings(&["C", "D"]).into_iter().collect()));
    }

    #[test]
    fn assigns_every_node_to_exactly_one_scc_with_no_duplicates() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]), ("B", &["C"]), ("C", &["A", "D"]),
            ("D", &["E"]), ("E", &["D"]),
        ]);
        let node_ids = to_strings(&["A", "B", "C", "D", "E"]);
        let result = kosaraju_scc(&adjacency_list, &node_ids);
        let all_nodes: Vec<_> = result.iter().flatten().cloned().collect();
        assert_eq!(all_nodes.len(), node_ids.len());
        let all_set: std::collections::HashSet<_> = all_nodes.into_iter().collect();
        let expected_set: std::collections::HashSet<_> = node_ids.into_iter().collect();
        assert_eq!(all_set, expected_set);
    }

    #[test]
    fn produces_same_scc_groupings_for_known_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]), ("B", &["C"]), ("C", &["A"]),
            ("D", &["E"]), ("E", &["D"]),
        ]);
        let result = kosaraju_scc(&adjacency_list, &to_strings(&["A", "B", "C", "D", "E"]));
        assert_eq!(result.len(), 2);
        let sets: Vec<_> = result.iter().map(|c| comp_set(c)).collect();
        assert!(sets.contains(&to_strings(&["A", "B", "C"]).into_iter().collect()));
        assert!(sets.contains(&to_strings(&["D", "E"]).into_iter().collect()));
    }
}
