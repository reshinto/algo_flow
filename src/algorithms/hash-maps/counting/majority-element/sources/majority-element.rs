// Majority Element — find the element that appears more than n/2 times using a frequency map
use std::collections::HashMap;

fn majority_element(numbers: &[i32]) -> i32 {
    let mut frequency_map: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    let threshold = numbers.len() / 2; // @step:initialize
    for &current_num in numbers {
        let updated_count = frequency_map.entry(current_num).or_insert(0); // @step:increment-count
        *updated_count += 1; // @step:increment-count
        if *updated_count > threshold {
            return current_num; // @step:key-found
        }
    }
    -1 // @step:complete
}
