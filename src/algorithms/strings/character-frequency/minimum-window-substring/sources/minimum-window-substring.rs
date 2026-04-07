// Minimum Window Substring
// Finds the smallest contiguous window in `text` that contains all characters of `pattern`.
// Returns an empty string if no such window exists.
// Time: O(n + m) where n = text.length, m = pattern.length
// Space: O(σ) — frequency maps bounded by alphabet size

use std::collections::HashMap;

fn minimum_window_substring(text: &str, pattern: &str) -> String {
    if pattern.is_empty() || text.len() < pattern.len() { return String::new(); } // @step:initialize

    let mut target_frequency: HashMap<char, i64> = HashMap::new(); // @step:initialize
    for ch in pattern.chars() {
        // @step:initialize
        *target_frequency.entry(ch).or_insert(0) += 1; // @step:initialize
    }

    let mut window_frequency: HashMap<char, i64> = HashMap::new(); // @step:initialize
    let required = target_frequency.len(); // @step:initialize
    let mut satisfied = 0usize; // @step:initialize
    let mut left_index = 0usize; // @step:initialize
    let mut best_start: i64 = -1; // @step:initialize
    let mut best_length = i64::MAX; // @step:initialize

    let text_chars: Vec<char> = text.chars().collect();

    for right_index in 0..text_chars.len() {
        // @step:expand-window
        let right_char = text_chars[right_index]; // @step:expand-window
        *window_frequency.entry(right_char).or_insert(0) += 1; // @step:update-frequency

        if let Some(&target_count) = target_frequency.get(&right_char) {
            // @step:window-match
            if window_frequency[&right_char] == target_count {
                // @step:window-match
                satisfied += 1; // @step:window-match
            }
        }

        while satisfied == required {
            // @step:shrink-window
            let window_length = (right_index - left_index + 1) as i64; // @step:add-to-result
            if window_length < best_length {
                // @step:add-to-result
                best_length = window_length; // @step:add-to-result
                best_start = left_index as i64; // @step:add-to-result
            }

            let left_char = text_chars[left_index]; // @step:shrink-window
            *window_frequency.entry(left_char).or_insert(0) -= 1; // @step:update-frequency

            if let Some(&left_target) = target_frequency.get(&left_char) {
                // @step:shrink-window
                if window_frequency[&left_char] < left_target {
                    // @step:shrink-window
                    satisfied -= 1; // @step:shrink-window
                }
            }

            left_index += 1; // @step:shrink-window
        }
    }

    if best_start == -1 {
        String::new() // @step:complete
    } else {
        text_chars[best_start as usize..(best_start + best_length) as usize]
            .iter()
            .collect() // @step:complete
    }
}
