// Missing Number — find the missing number in range [0, n] using a hash set
use std::collections::HashSet;

fn missing_number(numbers: &[i32]) -> i32 {
    let mut number_set: HashSet<i32> = HashSet::new(); // @step:initialize
    for &num in numbers {
        number_set.insert(num); // @step:insert-key
    }
    for check_value in 0..=(numbers.len() as i32) {
        if !number_set.contains(&check_value) {
            // @step:lookup-key
            return check_value; // @step:key-not-found
        }
    }
    -1 // @step:complete
}
