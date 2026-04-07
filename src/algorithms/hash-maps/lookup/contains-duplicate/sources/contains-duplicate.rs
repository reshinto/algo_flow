// Contains Duplicate — determine if any value appears at least twice using a hash set
use std::collections::HashSet;

fn contains_duplicate(numbers: &[i32]) -> bool {
    let mut seen: HashSet<i32> = HashSet::new(); // @step:initialize
    for &current in numbers {
        if seen.contains(&current) {
            // @step:key-found
            return true; // @step:key-found
        }
        // Not seen yet — record it for future duplicate checks
        seen.insert(current); // @step:insert-key
    }
    false // @step:complete
}
