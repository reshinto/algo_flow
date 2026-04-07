// Longest K-Distinct — O(n) variable sliding window with at-most K distinct elements
use std::collections::HashMap;

fn longest_k_distinct(input_array: &[i32], max_distinct: usize) -> (usize, usize) {
    let array_length = input_array.len();

    if array_length == 0 || max_distinct == 0 {
        // @step:initialize
        return (0, 0); // @step:initialize
    }

    let mut frequency_map: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    let mut window_start = 0usize;
    let mut max_length = 0usize;
    let mut best_start = 0usize;

    for window_end in 0..array_length {
        let incoming_element = input_array[window_end]; // @step:expand-window
        *frequency_map.entry(incoming_element).or_insert(0) += 1; // @step:expand-window

        // Shrink from the left while distinct count exceeds max_distinct
        while frequency_map.len() > max_distinct {
            let outgoing_element = input_array[window_start]; // @step:shrink-window
            let outgoing_count = frequency_map[&outgoing_element] - 1; // @step:shrink-window
            if outgoing_count == 0 {
                // @step:shrink-window
                frequency_map.remove(&outgoing_element); // @step:shrink-window
            } else {
                frequency_map.insert(outgoing_element, outgoing_count); // @step:shrink-window
            }
            window_start += 1; // @step:shrink-window
        }

        let current_length = window_end - window_start + 1; // @step:compare
        if current_length > max_length {
            // @step:compare
            max_length = current_length; // @step:compare
            best_start = window_start; // @step:compare
        }
    }

    (max_length, best_start) // @step:complete
}
