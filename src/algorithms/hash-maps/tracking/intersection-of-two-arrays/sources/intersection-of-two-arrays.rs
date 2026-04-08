// Intersection of Two Arrays — find common elements using a hash set
use std::collections::HashSet;

fn intersection_of_two_arrays(numbers_a: &[i32], numbers_b: &[i32]) -> Vec<i32> {
    let mut set_a: HashSet<i32> = HashSet::new(); // @step:initialize
    for &num in numbers_a {
        set_a.insert(num); // @step:insert-key
    }
    let mut result: Vec<i32> = Vec::new();
    for &current_num in numbers_b {
        if set_a.contains(&current_num) {
            // @step:lookup-key
            result.push(current_num); // @step:key-found
            set_a.remove(&current_num);
        }
    }
    result // @step:complete
}
