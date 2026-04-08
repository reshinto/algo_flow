// Find All Duplicates — find all elements that appear twice using a hash set
use std::collections::HashSet;

fn find_all_duplicates(numbers: &[i32]) -> Vec<i32> {
    let mut seen_set: HashSet<i32> = HashSet::new(); // @step:initialize
    let mut duplicates: Vec<i32> = Vec::new();
    for &current_num in numbers {
        if seen_set.contains(&current_num) {
            // @step:check-duplicate
            duplicates.push(current_num); // @step:key-found
        } else {
            seen_set.insert(current_num); // @step:insert-key
        }
    }
    duplicates // @step:complete
}
