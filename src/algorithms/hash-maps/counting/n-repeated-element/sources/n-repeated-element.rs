// N-Repeated Element — find the element repeated n times in an array of size 2n
use std::collections::HashMap;

fn n_repeated_element(numbers: &[i32]) -> i32 {
    let mut frequency_map: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    let target_count = numbers.len() / 2;
    for &current_num in numbers {
        let updated_count = frequency_map.entry(current_num).or_insert(0);
        *updated_count += 1; // @step:increment-count
        if *updated_count == target_count {
            return current_num; // @step:key-found
        }
    }
    -1 // @step:complete
}
