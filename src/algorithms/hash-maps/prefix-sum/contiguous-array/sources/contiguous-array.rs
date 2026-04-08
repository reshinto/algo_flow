// Contiguous Array — find the longest subarray with equal number of 0s and 1s
use std::collections::HashMap;

fn contiguous_array(numbers: &[i32]) -> usize {
    let mut prefix_sum_map: HashMap<i32, i32> = HashMap::new(); // @step:initialize
    prefix_sum_map.insert(0, -1);
    let mut running_sum: i32 = 0;
    let mut max_length: usize = 0;
    for (element_index, &num) in numbers.iter().enumerate() {
        running_sum += if num == 0 { -1 } else { 1 }; // @step:check-prefix
        if let Some(&previous_index) = prefix_sum_map.get(&running_sum) {
            let subarray_length = element_index as i32 - previous_index; // @step:prefix-found
            if subarray_length as usize > max_length {
                max_length = subarray_length as usize;
            }
        } else {
            prefix_sum_map.insert(running_sum, element_index as i32); // @step:insert-key
        }
    }
    max_length // @step:complete
}
