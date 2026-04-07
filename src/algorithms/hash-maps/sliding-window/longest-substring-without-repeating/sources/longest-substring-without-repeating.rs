// Longest Substring Without Repeating Characters — sliding window with hash map
use std::collections::HashMap;

fn longest_substring_without_repeating(text: &str) -> usize {
    let mut char_index_map: HashMap<char, usize> = HashMap::new(); // @step:initialize
    let mut window_start = 0;
    let mut max_length = 0;
    for (window_end, current_char) in text.chars().enumerate() {
        let previous_index = char_index_map.get(&current_char).copied(); // @step:check-duplicate
        if let Some(prev_idx) = previous_index {
            if prev_idx >= window_start {
                window_start = prev_idx + 1; // @step:shrink-window
            }
        }
        char_index_map.insert(current_char, window_end); // @step:insert-key
        let current_length = window_end - window_start + 1; // @step:expand-window
        if current_length > max_length {
            max_length = current_length;
        }
    }
    max_length // @step:complete
}
