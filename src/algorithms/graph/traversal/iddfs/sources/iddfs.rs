// IDDFS — iterative deepening depth-first search using increasing depth limits
use std::collections::HashMap;

pub fn iterative_deepening_dfs(
    adjacency_list: &HashMap<String, Vec<String>>,
    start_node_id: &str,
    max_depth: Option<usize>,
) -> Vec<String> {
    let mut visit_order: Vec<String> = Vec::new(); // @step:initialize
    let resolved_max_depth = max_depth.unwrap_or_else(|| adjacency_list.len()); // @step:initialize

    for depth_limit in 0..=resolved_max_depth {
        // @step:initialize
        visit_order.clear(); // @step:initialize
        let mut visited_set: Vec<String> = Vec::new(); // @step:initialize

        struct StackFrame {
            node_id: String,
            depth: usize,
        }

        let mut node_stack: Vec<StackFrame> = vec![StackFrame {
            node_id: start_node_id.to_string(),
            depth: 0,
        }]; // @step:push-stack

        while let Some(frame) = node_stack.pop() {
            // @step:pop-stack
            let current_node_id = frame.node_id; // @step:pop-stack
            let current_depth = frame.depth; // @step:pop-stack

            if visited_set.contains(&current_node_id) {
                // @step:backtrack
                continue; // @step:backtrack
            }

            visited_set.push(current_node_id.clone()); // @step:visit
            visit_order.push(current_node_id.clone()); // @step:visit

            if current_depth >= depth_limit {
                // @step:visit
                continue; // @step:visit
            }

            let empty_vec = Vec::new();
            let neighbors = adjacency_list.get(&current_node_id).unwrap_or(&empty_vec); // @step:visit-edge
            for neighbor_index in (0..neighbors.len()).rev() {
                // @step:visit-edge
                let neighbor_id = &neighbors[neighbor_index]; // @step:visit-edge
                if !visited_set.contains(neighbor_id) {
                    // @step:visit-edge
                    node_stack.push(StackFrame {
                        node_id: neighbor_id.clone(),
                        depth: current_depth + 1,
                    }); // @step:push-stack
                }
            }
        }

        let all_visited = adjacency_list.keys().all(|nodeId| visited_set.contains(nodeId)); // @step:complete
        if all_visited {
            break; // @step:complete
        }
    }

    visit_order // @step:complete
}
