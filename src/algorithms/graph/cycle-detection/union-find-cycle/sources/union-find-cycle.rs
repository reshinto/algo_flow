// Union-Find Cycle Detection — detect cycles by checking if two endpoints share a component
use std::collections::HashMap;

pub struct Edge {
    pub source: String,
    pub target: String,
}

pub fn union_find_cycle(edges: &[Edge], node_ids: &[String]) -> bool {
    let mut parent: HashMap<String, String> = HashMap::new(); // @step:initialize
    let mut rank: HashMap<String, u32> = HashMap::new(); // @step:initialize
    for node_id in node_ids {
        // @step:initialize
        parent.insert(node_id.clone(), node_id.clone()); // @step:initialize
        rank.insert(node_id.clone(), 0); // @step:initialize
    }

    fn find_root(node_id: &str, parent: &mut HashMap<String, String>) -> String {
        let current_parent = parent.get(node_id).cloned().unwrap_or_else(|| node_id.to_string());
        if current_parent != node_id {
            let root = find_root(&current_parent.clone(), parent);
            parent.insert(node_id.to_string(), root.clone());
            root
        } else {
            node_id.to_string()
        }
    }

    fn union_components(
        node_a: &str,
        node_b: &str,
        parent: &mut HashMap<String, String>,
        rank: &mut HashMap<String, u32>,
    ) {
        let root_a = find_root(node_a, parent);
        let root_b = find_root(node_b, parent);
        let rank_a = *rank.get(&root_a).unwrap_or(&0);
        let rank_b = *rank.get(&root_b).unwrap_or(&0);
        if rank_a < rank_b {
            parent.insert(root_a, root_b);
        } else if rank_a > rank_b {
            parent.insert(root_b, root_a);
        } else {
            parent.insert(root_b.clone(), root_a.clone());
            rank.insert(root_a, rank_a + 1);
        }
    }

    for edge in edges {
        let source_root = find_root(&edge.source, &mut parent); // @step:visit-edge
        let target_root = find_root(&edge.target, &mut parent); // @step:visit-edge

        if source_root == target_root {
            // @step:visit-edge
            return true; // @step:complete
        }

        union_components(&edge.source, &edge.target, &mut parent, &mut rank); // @step:merge-components
    }

    false // @step:complete
}
