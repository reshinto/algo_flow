// First Unique Character — find the index of the first non-repeating character in a string
use std::collections::HashMap;

fn first_unique_character(text: &str) -> i32 {
    let mut char_counts: HashMap<char, i32> = HashMap::new(); // @step:initialize
    for current_char in text.chars() {
        *char_counts.entry(current_char).or_insert(0) += 1; // @step:increment-count
    }
    for (char_index, current_char) in text.chars().enumerate() {
        if char_counts[&current_char] == 1 { // @step:lookup-key
            return char_index as i32; // @step:key-found
        }
    }
    -1 // @step:complete
}
