// Kruskal's Algorithm — build MST by sorting edges and merging components with Union-Find
use std::collections::HashMap;

pub struct WeightedEdge {
    pub source: String,
    pub target: String,
    pub weight: i64,
}

pub fn kruskals_algorithm(edges: &[WeightedEdge], node_ids: &[String]) -> Vec<(String, String, i64)> {
    let mut mst_edges: Vec<(String, String, i64)> = Vec::new(); // @step:initialize
    let mut parent: HashMap<String, String> = HashMap::new(); // @step:initialize
    let mut rank: HashMap<String, u32> = HashMap::new(); // @step:initialize

    for node_id in node_ids {
        // @step:initialize
        parent.insert(node_id.clone(), node_id.clone()); // @step:initialize
        rank.insert(node_id.clone(), 0); // @step:initialize
    }

    fn find(node_id: &str, parent: &mut HashMap<String, String>) -> String {
        // @step:initialize
        let current_parent = parent.get(node_id).cloned().unwrap_or_else(|| node_id.to_string());
        if current_parent != node_id {
            // @step:initialize
            let root = find(&current_parent.clone(), parent); // @step:initialize
            parent.insert(node_id.to_string(), root.clone());
            root // @step:initialize
        } else {
            node_id.to_string() // @step:initialize
        }
    }

    fn union(
        node_a: &str,
        node_b: &str,
        parent: &mut HashMap<String, String>,
        rank: &mut HashMap<String, u32>,
    ) -> bool {
        // @step:initialize
        let root_a = find(node_a, parent); // @step:initialize
        let root_b = find(node_b, parent); // @step:initialize
        if root_a == root_b {
            return false; // @step:initialize
        }
        let rank_a = *rank.get(&root_a).unwrap_or(&0);
        let rank_b = *rank.get(&root_b).unwrap_or(&0);
        if rank_a < rank_b {
            // @step:initialize
            parent.insert(root_a, root_b); // @step:initialize
        } else if rank_a > rank_b {
            // @step:initialize
            parent.insert(root_b, root_a); // @step:initialize
        } else {
            // @step:initialize
            parent.insert(root_b.clone(), root_a.clone()); // @step:initialize
            rank.insert(root_a, rank_a + 1); // @step:initialize
        }
        true // @step:initialize
    }

    let mut sorted_edges: Vec<usize> = (0..edges.len()).collect();
    sorted_edges.sort_by(|&edgeA, &edgeB| edges[edgeA].weight.cmp(&edges[edgeB].weight)); // @step:sort-edges

    for edge_index in sorted_edges {
        let edge = &edges[edge_index];
        let source_root = find(&edge.source, &mut parent); // @step:visit-edge
        let target_root = find(&edge.target, &mut parent); // @step:visit-edge

        if source_root != target_root {
            // @step:visit-edge
            union(&edge.source, &edge.target, &mut parent, &mut rank); // @step:add-to-mst
            mst_edges.push((edge.source.clone(), edge.target.clone(), edge.weight)); // @step:add-to-mst
        }
        // else: edge would create a cycle — reject it // @step:reject-edge

        if mst_edges.len() == node_ids.len() - 1 {
            break; // @step:add-to-mst
        }
    }

    mst_edges // @step:complete
}
