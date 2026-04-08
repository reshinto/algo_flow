// Valid Anagram — determine if two strings are anagrams using character frequency counts
use std::collections::HashMap;

fn valid_anagram(text_a: &str, text_b: &str) -> bool {
    if text_a.len() != text_b.len() {
        return false; // @step:initialize
    }
    let mut char_counts: HashMap<char, i32> = HashMap::new(); // @step:initialize
    for current_char in text_a.chars() {
        *char_counts.entry(current_char).or_insert(0) += 1; // @step:increment-count
    }
    for current_char in text_b.chars() {
        let updated_count = char_counts.entry(current_char).or_insert(0); // @step:decrement-count
        *updated_count -= 1; // @step:decrement-count
        if *updated_count < 0 {
            return false; // @step:complete
        }
        // @step:decrement-count
    }
    true // @step:complete
}
