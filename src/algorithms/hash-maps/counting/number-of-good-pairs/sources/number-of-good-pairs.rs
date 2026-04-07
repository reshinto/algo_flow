// Number of Good Pairs — count pairs (i, j) where nums[i] == nums[j] and i < j
use std::collections::HashMap;

fn number_of_good_pairs(numbers: &[i32]) -> i32 {
    let mut frequency_map: HashMap<i32, i32> = HashMap::new(); // @step:initialize
    let mut total_pairs = 0;
    for &current_num in numbers {
        let current_count = *frequency_map.get(&current_num).unwrap_or(&0);
        total_pairs += current_count; // @step:key-found
        frequency_map.insert(current_num, current_count + 1); // @step:increment-count
    }
    total_pairs // @step:complete
}
