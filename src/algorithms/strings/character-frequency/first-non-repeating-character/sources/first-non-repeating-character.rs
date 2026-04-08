// First Non-Repeating Character
// Returns the index of the first character that appears exactly once, or -1 if none.
// Time: O(n) — two passes over the string (bounded by alphabet size)
// Space: O(1) — frequency map bounded by alphabet size (26 letters)

use std::collections::HashMap;

fn first_non_repeating_character(text: &str) -> i64 {
    let mut frequency_map: HashMap<char, usize> = HashMap::new(); // @step:initialize

    for ch in text.chars() {
        // @step:update-frequency
        *frequency_map.entry(ch).or_insert(0) += 1; // @step:update-frequency
    }

    for (char_idx, ch) in text.chars().enumerate() {
        // @step:compare
        if frequency_map.get(&ch) == Some(&1) { return char_idx as i64; } // @step:found
    }

    -1 // @step:complete
}
