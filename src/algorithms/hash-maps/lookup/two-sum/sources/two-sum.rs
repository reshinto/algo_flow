// Two Sum — find two indices whose values add up to the target using a hash map
use std::collections::HashMap;

fn two_sum(numbers: &[i32], target: i32) -> [i32; 2] {
    let mut map: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    for (idx, &current) in numbers.iter().enumerate() {
        let complement = target - current; // @step:lookup-key
        if let Some(&stored_idx) = map.get(&complement) {
            // @step:key-found
            return [stored_idx as i32, idx as i32]; // @step:key-found
        }
        // Complement not found — store current number for future lookups
        map.insert(current, idx); // @step:insert-key
    }
    [-1, -1] // @step:complete
}
