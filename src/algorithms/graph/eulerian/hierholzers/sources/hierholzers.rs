// Hierholzer's Algorithm — find an Eulerian circuit using subcircuit splicing
use std::collections::HashMap;

pub fn hierholzers_algorithm(
    adjacency_list: &HashMap<String, Vec<String>>,
    start_node_id: &str,
) -> Vec<String> {
    // Build a mutable copy of the adjacency list so edges can be removed as used
    let mut remaining_edges: HashMap<String, Vec<String>> = HashMap::new(); // @step:initialize
    for (node_id, neighbors) in adjacency_list {
        remaining_edges.insert(node_id.clone(), neighbors.clone()); // @step:initialize
    }

    let mut circuit: Vec<String> = Vec::new(); // @step:initialize
    let mut node_stack: Vec<String> = vec![start_node_id.to_string()]; // @step:initialize,push-stack

    while !node_stack.is_empty() {
        let current_node_id = node_stack.last().unwrap().clone(); // @step:pop-stack
        let current_neighbors = remaining_edges
            .get_mut(&current_node_id)
            .map(|v| v.len())
            .unwrap_or(0);

        if current_neighbors > 0 {
            let next_node_id = remaining_edges
                .get_mut(&current_node_id)
                .unwrap()
                .remove(0); // @step:use-edge
            // For undirected graphs, remove the reverse edge as well
            if let Some(reverse_neighbors) = remaining_edges.get_mut(&next_node_id) {
                if let Some(reverse_index) =
                    reverse_neighbors.iter().position(|nodeId| nodeId == &current_node_id)
                {
                    reverse_neighbors.remove(reverse_index); // @step:use-edge
                }
            }
            node_stack.push(next_node_id); // @step:push-stack
        } else {
            // No unused edges from current_node_id — add it to the circuit
            node_stack.pop(); // @step:pop-stack
            circuit.insert(0, current_node_id); // @step:visit
        }
    }

    circuit // @step:complete
}
