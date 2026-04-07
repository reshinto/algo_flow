// Max Frequency Stack — pop the most frequent element using a frequency map and stack-of-stacks
use std::collections::HashMap;

fn max_frequency_stack(values: &[i32]) -> Vec<i32> {
    let mut freq_map: HashMap<i32, usize> = HashMap::new(); // @step:initialize
    let mut freq_stacks: HashMap<usize, Vec<i32>> = HashMap::new(); // @step:initialize
    let mut max_frequency: usize = 0; // @step:initialize
    let mut pop_results: Vec<i32> = Vec::new(); // @step:initialize

    // Push phase: update frequency map and push each value onto its frequency-level stack
    for element_idx in 0..values.len() {
        let current_value = values[element_idx]; // @step:visit
        let current_freq = freq_map.get(&current_value).copied().unwrap_or(0) + 1; // @step:compare
        freq_map.insert(current_value, current_freq); // @step:compare
        if current_freq > max_frequency {
            max_frequency = current_freq; // @step:compare
        }
        freq_stacks.entry(current_freq).or_insert_with(Vec::new).push(current_value); // @step:push
    }

    // Pop phase: always pop from the highest-frequency stack
    while max_frequency > 0 {
        let top_stack = freq_stacks.get_mut(&max_frequency).unwrap(); // @step:pop
        let popped = top_stack.pop().unwrap(); // @step:pop
        *freq_map.get_mut(&popped).unwrap() -= 1; // @step:pop
        if top_stack.is_empty() {
            max_frequency -= 1; // @step:pop
        }
        pop_results.push(popped); // @step:pop
    }

    pop_results // @step:complete
}

fn main() {
    println!("{:?}", max_frequency_stack(&[5, 7, 5, 7, 4, 5]));
}
