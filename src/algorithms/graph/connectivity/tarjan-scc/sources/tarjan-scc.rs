// Tarjan's SCC — finds strongly connected components using DFS with discovery and low-link values
use std::collections::HashMap;

pub fn tarjan_scc(
    adjacency_list: &HashMap<String, Vec<String>>,
    node_ids: &[String],
) -> Vec<Vec<String>> {
    let mut discovery_time: HashMap<String, u32> = HashMap::new(); // @step:initialize
    let mut low_link: HashMap<String, u32> = HashMap::new(); // @step:initialize
    let mut on_stack: HashMap<String, bool> = HashMap::new(); // @step:initialize
    let mut node_stack: Vec<String> = Vec::new(); // @step:initialize
    let mut components: Vec<Vec<String>> = Vec::new(); // @step:initialize
    let mut timer: u32 = 0; // @step:initialize

    fn dfs(
        node_id: &str,
        adjacency_list: &HashMap<String, Vec<String>>,
        discovery_time: &mut HashMap<String, u32>,
        low_link: &mut HashMap<String, u32>,
        on_stack: &mut HashMap<String, bool>,
        node_stack: &mut Vec<String>,
        components: &mut Vec<Vec<String>>,
        timer: &mut u32,
    ) {
        discovery_time.insert(node_id.to_string(), *timer); // @step:visit
        low_link.insert(node_id.to_string(), *timer); // @step:visit
        *timer += 1; // @step:visit
        node_stack.push(node_id.to_string()); // @step:push-stack
        on_stack.insert(node_id.to_string(), true); // @step:push-stack

        let empty_vec = Vec::new();
        let neighbors = adjacency_list.get(node_id).unwrap_or(&empty_vec).clone();
        for neighbor_id in &neighbors {
            if !discovery_time.contains_key(neighbor_id.as_str()) {
                dfs(
                    neighbor_id,
                    adjacency_list,
                    discovery_time,
                    low_link,
                    on_stack,
                    node_stack,
                    components,
                    timer,
                ); // @step:visit-edge
                let neighbor_low = *low_link.get(neighbor_id.as_str()).unwrap_or(&u32::MAX);
                let current_low = *low_link.get(node_id).unwrap_or(&u32::MAX);
                low_link.insert(node_id.to_string(), current_low.min(neighbor_low)); // @step:visit-edge
            } else if *on_stack.get(neighbor_id.as_str()).unwrap_or(&false) {
                let neighbor_disc = *discovery_time.get(neighbor_id.as_str()).unwrap_or(&u32::MAX);
                let current_low = *low_link.get(node_id).unwrap_or(&u32::MAX);
                low_link.insert(node_id.to_string(), current_low.min(neighbor_disc)); // @step:visit-edge
            }
        }

        let node_low = *low_link.get(node_id).unwrap_or(&u32::MAX);
        let node_disc = *discovery_time.get(node_id).unwrap_or(&u32::MAX);
        if node_low == node_disc {
            let mut component: Vec<String> = Vec::new(); // @step:pop-stack
            loop {
                let popped_node_id = node_stack.pop().unwrap(); // @step:pop-stack
                on_stack.insert(popped_node_id.clone(), false); // @step:pop-stack
                let is_root = popped_node_id == node_id;
                component.push(popped_node_id); // @step:pop-stack
                if is_root {
                    break;
                }
            }
            components.push(component); // @step:assign-component
        }
    }

    for node_id in node_ids {
        if !discovery_time.contains_key(node_id.as_str()) {
            dfs(
                node_id,
                adjacency_list,
                &mut discovery_time,
                &mut low_link,
                &mut on_stack,
                &mut node_stack,
                &mut components,
                &mut timer,
            ); // @step:initialize
        }
    }

    components // @step:complete
}
