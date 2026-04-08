// Find All Anagrams — slide a window over text and record start indices where window is an anagram of pattern
use std::collections::HashMap;

fn maps_equal(map_a: &HashMap<char, i32>, map_b: &HashMap<char, i32>) -> bool {
    if map_a.len() != map_b.len() {
        return false;
    }
    for (key, value) in map_a {
        if map_b.get(key) != Some(value) {
            return false;
        }
    }
    true
}

fn find_all_anagrams(text: &str, pattern: &str) -> Vec<usize> {
    let text_chars: Vec<char> = text.chars().collect();
    let pattern_chars: Vec<char> = pattern.chars().collect();
    let mut pattern_freq: HashMap<char, i32> = HashMap::new(); // @step:initialize
    for &pattern_char in &pattern_chars {
        *pattern_freq.entry(pattern_char).or_insert(0) += 1; // @step:increment-count
    }
    let mut window_freq: HashMap<char, i32> = HashMap::new();
    let window_size = pattern_chars.len();
    let mut result: Vec<usize> = Vec::new();
    for right_idx in 0..text_chars.len() {
        // Expand window: add incoming character
        let incoming_char = text_chars[right_idx];
        *window_freq.entry(incoming_char).or_insert(0) += 1; // @step:expand-window
        // Shrink window: remove outgoing character once full window is established
        if right_idx >= window_size {
            let outgoing_char = text_chars[right_idx - window_size];
            let outgoing_count = window_freq.entry(outgoing_char).or_insert(0);
            *outgoing_count -= 1; // @step:shrink-window
            if *outgoing_count == 0 {
                window_freq.remove(&outgoing_char); // @step:decrement-count
            }
            // @step:decrement-count
        }
        // Check if current window matches pattern frequency map
        if right_idx >= window_size - 1 {
            if maps_equal(&window_freq, &pattern_freq) {
                result.push(right_idx + 1 - window_size); // @step:key-found
            }
        }
    }
    result // @step:complete
}
