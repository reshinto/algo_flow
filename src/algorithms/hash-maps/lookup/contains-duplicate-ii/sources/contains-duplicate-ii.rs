// Contains Duplicate II — find if the same value appears within maxDistance index gap
use std::collections::HashMap;

fn contains_duplicate_ii(numbers: &[i32], max_distance: usize) -> bool {
    let mut index_map: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    for (current_index, &current) in numbers.iter().enumerate() {
        if let Some(&stored_index) = index_map.get(&current) {
            // @step:check-duplicate
            if current_index - stored_index <= max_distance {
                // @step:key-found
                return true; // @step:key-found
            }
            // Too far apart — update stored index to keep closest occurrence
            index_map.insert(current, current_index); // @step:update-value
        } else {
            // First time seeing this value — store its index
            index_map.insert(current, current_index); // @step:insert-key
        }
    }
    false // @step:complete
}
