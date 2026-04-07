include!("edmonds-karp.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn make_graph(entries: &[(&str, &[(&str, i64)])]) -> HashMap<String, Vec<FlowEdge>> {
        entries
            .iter()
            .map(|(node, edges)| {
                (
                    node.to_string(),
                    edges
                        .iter()
                        .map(|(tgt, cap)| FlowEdge {
                            target: tgt.to_string(),
                            capacity: *cap,
                        })
                        .collect(),
                )
            })
            .collect()
    }

    #[test]
    fn computes_max_flow_for_simple_linear_path() {
        let graph = make_graph(&[("S", &[("T", 5)]), ("T", &[])]);
        assert_eq!(edmonds_karp(&graph, "S", "T"), 5);
    }

    #[test]
    fn computes_max_flow_limited_by_bottleneck_edge() {
        let graph = make_graph(&[("S", &[("A", 10)]), ("A", &[("T", 3)]), ("T", &[])]);
        assert_eq!(edmonds_karp(&graph, "S", "T"), 3);
    }

    #[test]
    fn computes_max_flow_across_two_parallel_paths() {
        let graph = make_graph(&[
            ("S", &[("A", 5), ("B", 5)]),
            ("A", &[("T", 5)]),
            ("B", &[("T", 5)]),
            ("T", &[]),
        ]);
        assert_eq!(edmonds_karp(&graph, "S", "T"), 10);
    }

    #[test]
    fn computes_max_flow_for_default_6_node_network() {
        let graph = make_graph(&[
            ("S", &[("A", 10), ("B", 8)]),
            ("A", &[("B", 5), ("C", 7)]),
            ("B", &[("D", 10)]),
            ("C", &[("D", 3), ("T", 8)]),
            ("D", &[("T", 10)]),
            ("T", &[]),
        ]);
        assert_eq!(edmonds_karp(&graph, "S", "T"), 17);
    }

    #[test]
    fn returns_zero_when_no_path_from_source_to_sink() {
        let graph = make_graph(&[("S", &[("A", 10)]), ("A", &[]), ("T", &[])]);
        assert_eq!(edmonds_karp(&graph, "S", "T"), 0);
    }

    #[test]
    fn produces_same_max_flow_as_ford_fulkerson() {
        let graph = make_graph(&[
            ("S", &[("A", 4), ("B", 2)]),
            ("A", &[("B", 4), ("T", 2)]),
            ("B", &[("T", 4)]),
            ("T", &[]),
        ]);
        assert_eq!(edmonds_karp(&graph, "S", "T"), 6);
    }

    #[test]
    fn handles_graph_where_source_has_no_outgoing_edges() {
        let graph = make_graph(&[("S", &[]), ("T", &[])]);
        assert_eq!(edmonds_karp(&graph, "S", "T"), 0);
    }

    #[test]
    fn handles_three_path_diamond_graph_correctly() {
        let graph = make_graph(&[
            ("S", &[("A", 10), ("B", 10)]),
            ("A", &[("T", 10)]),
            ("B", &[("T", 10)]),
            ("T", &[]),
        ]);
        assert_eq!(edmonds_karp(&graph, "S", "T"), 20);
    }
}
