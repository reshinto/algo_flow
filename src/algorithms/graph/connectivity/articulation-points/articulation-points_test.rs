include!("sources/articulation-points.rs");

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

    #[test]
    fn finds_two_articulation_points_in_default_7_node_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B", "C"]),
            ("B", &["A", "C"]),
            ("C", &["A", "B", "D"]),
            ("D", &["C", "E", "F"]),
            ("E", &["D", "G"]),
            ("F", &["D", "G"]),
            ("G", &["E", "F"]),
        ]);
        let node_ids = to_strings(&["A", "B", "C", "D", "E", "F", "G"]);
        let result = find_articulation_points(&adjacency_list, &node_ids);
        let result_set: std::collections::HashSet<&str> =
            result.iter().map(|s| s.as_str()).collect();
        assert_eq!(result_set, ["C", "D"].iter().copied().collect());
    }

    #[test]
    fn returns_no_articulation_points_for_triangle() {
        let adjacency_list = make_adj(&[
            ("A", &["B", "C"]),
            ("B", &["A", "C"]),
            ("C", &["A", "B"]),
        ]);
        let result = find_articulation_points(&adjacency_list, &to_strings(&["A", "B", "C"]));
        assert!(result.is_empty(), "Expected empty, got {:?}", result);
    }

    #[test]
    fn finds_single_articulation_point_in_path_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]),
            ("B", &["A", "C"]),
            ("C", &["B"]),
        ]);
        let result = find_articulation_points(&adjacency_list, &to_strings(&["A", "B", "C"]));
        let result_set: std::collections::HashSet<&str> =
            result.iter().map(|s| s.as_str()).collect();
        assert_eq!(result_set, ["B"].iter().copied().collect());
    }

    #[test]
    fn finds_multiple_articulation_points_in_longer_path() {
        let adjacency_list = make_adj(&[
            ("A", &["B"]),
            ("B", &["A", "C"]),
            ("C", &["B", "D"]),
            ("D", &["C"]),
        ]);
        let result =
            find_articulation_points(&adjacency_list, &to_strings(&["A", "B", "C", "D"]));
        let result_set: std::collections::HashSet<&str> =
            result.iter().map(|s| s.as_str()).collect();
        assert_eq!(result_set, ["B", "C"].iter().copied().collect());
    }

    #[test]
    fn returns_no_articulation_points_for_single_node() {
        let adjacency_list = make_adj(&[("A", &[])]);
        let result = find_articulation_points(&adjacency_list, &to_strings(&["A"]));
        assert!(result.is_empty());
    }

    #[test]
    fn returns_no_articulation_points_for_fully_connected_graph() {
        let adjacency_list = make_adj(&[
            ("A", &["B", "C", "D"]),
            ("B", &["A", "C", "D"]),
            ("C", &["A", "B", "D"]),
            ("D", &["A", "B", "C"]),
        ]);
        let result =
            find_articulation_points(&adjacency_list, &to_strings(&["A", "B", "C", "D"]));
        assert!(result.is_empty());
    }

    #[test]
    fn finds_star_center_as_articulation_point() {
        let adjacency_list = make_adj(&[
            ("Center", &["A", "B", "C"]),
            ("A", &["Center"]),
            ("B", &["Center"]),
            ("C", &["Center"]),
        ]);
        let result = find_articulation_points(
            &adjacency_list,
            &to_strings(&["Center", "A", "B", "C"]),
        );
        let result_set: std::collections::HashSet<&str> =
            result.iter().map(|s| s.as_str()).collect();
        assert_eq!(result_set, ["Center"].iter().copied().collect());
    }

    #[test]
    fn handles_disconnected_graphs_with_no_articulation_points() {
        let adjacency_list = make_adj(&[
            ("A", &["B", "C"]),
            ("B", &["A", "C"]),
            ("C", &["A", "B"]),
            ("D", &["E", "F"]),
            ("E", &["D", "F"]),
            ("F", &["D", "E"]),
        ]);
        let result = find_articulation_points(
            &adjacency_list,
            &to_strings(&["A", "B", "C", "D", "E", "F"]),
        );
        assert!(result.is_empty());
    }
}
