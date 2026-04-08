// Hash-Based Search — build a hash map for O(1) lookup after O(n) build phase
use std::collections::HashMap;

fn hash_search(array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    let mut hash_map: HashMap<i32, usize> = HashMap::new(); // @step:initialize

    // Build phase: insert every element into the hash map
    for (element_index, &element_value) in array.iter().enumerate() {
        // @step:visit
        hash_map.insert(element_value, element_index); // @step:visit
    }

    // Search phase: O(1) lookup
    match hash_map.get(&target_value) {
        // @step:compare
        Some(&result_index) => {
            // @step:compare,found
            result_index as i32 // @step:found
        }
        None => -1, // @step:complete
    }
}
