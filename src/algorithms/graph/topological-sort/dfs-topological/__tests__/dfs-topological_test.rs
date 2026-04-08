include!("../sources/dfs-topological.rs");

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

    fn is_valid_topological_order(order: &[String], adj: &HashMap<String, Vec<String>>) -> bool {
        let mut position: HashMap<&str, usize> = HashMap::new();
        for (idx, node) in order.iter().enumerate() {
            position.insert(node, idx);
        }
        for (source, neighbors) in adj {
            let source_pos = match position.get(source.as_str()) {
                Some(&pos) => pos,
                None => return false,
            };
            for target in neighbors {
                let target_pos = match position.get(target.as_str()) {
                    Some(&pos) => pos,
                    None => return false,
                };
                if source_pos >= target_pos {
                    return false;
                }
            }
        }
        true
    }

    #[test]
    fn produces_valid_topological_order_for_default_dag() {
        let adj = make_adj(&[
            ("A", &["B", "C"]), ("B", &["D"]), ("C", &["D", "E"]),
            ("D", &["F"]), ("E", &["F"]), ("F", &[]),
        ]);
        let result = dfs_topological_sort(&adj, &to_strings(&["A","B","C","D","E","F"]));
        assert_eq!(result.len(), 6);
        assert!(is_valid_topological_order(&result, &adj));
    }

    #[test]
    fn places_source_node_first_in_linear_chain() {
        let adj = make_adj(&[("A", &["B"]), ("B", &["C"]), ("C", &["D"]), ("D", &[])]);
        let result = dfs_topological_sort(&adj, &to_strings(&["A","B","C","D"]));
        assert_eq!(result, to_strings(&["A","B","C","D"]));
    }

    #[test]
    fn handles_single_node_with_no_edges() {
        let adj = make_adj(&[("A", &[])]);
        let result = dfs_topological_sort(&adj, &to_strings(&["A"]));
        assert_eq!(result, to_strings(&["A"]));
    }

    #[test]
    fn handles_diamond_shaped_dag() {
        let adj = make_adj(&[("A", &["B","C"]), ("B", &["D"]), ("C", &["D"]), ("D", &[])]);
        let result = dfs_topological_sort(&adj, &to_strings(&["A","B","C","D"]));
        assert_eq!(result.len(), 4);
        assert!(is_valid_topological_order(&result, &adj));
        assert_eq!(result[0], "A");
        assert_eq!(result[result.len()-1], "D");
    }

    #[test]
    fn returns_all_nodes_for_fully_independent_node_set() {
        let adj = make_adj(&[("A", &[]), ("B", &[]), ("C", &[]), ("D", &[])]);
        let result = dfs_topological_sort(&adj, &to_strings(&["A","B","C","D"]));
        assert_eq!(result.len(), 4);
        let result_set: std::collections::HashSet<_> = result.iter().collect();
        let expected_strings = to_strings(&["A","B","C","D"]);
        let expected_set: std::collections::HashSet<_> = expected_strings.iter().collect();
        assert_eq!(result_set, expected_set);
    }

    #[test]
    fn handles_graph_where_multiple_root_nodes_exist() {
        let adj = make_adj(&[("A", &["C"]), ("B", &["C"]), ("C", &[])]);
        let result = dfs_topological_sort(&adj, &to_strings(&["A","B","C"]));
        assert_eq!(result.len(), 3);
        assert!(is_valid_topological_order(&result, &adj));
    }

    #[test]
    fn does_not_revisit_already_visited_nodes() {
        let adj = make_adj(&[("A", &["C"]), ("B", &["C"]), ("C", &["D"]), ("D", &[])]);
        let result = dfs_topological_sort(&adj, &to_strings(&["A","B","C","D"]));
        assert_eq!(result.len(), 4);
        assert_eq!(result.iter().filter(|n| n.as_str() == "C").count(), 1);
        assert_eq!(result.iter().filter(|n| n.as_str() == "D").count(), 1);
        assert!(is_valid_topological_order(&result, &adj));
    }
}
