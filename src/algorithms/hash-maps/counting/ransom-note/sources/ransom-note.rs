// Ransom Note — check if a ransom note can be constructed from magazine characters
use std::collections::HashMap;

fn ransom_note(ransom_note_text: &str, magazine: &str) -> bool {
    let mut char_counts: HashMap<char, i32> = HashMap::new(); // @step:initialize
    for current_char in magazine.chars() {
        *char_counts.entry(current_char).or_insert(0) += 1; // @step:increment-count
    }
    for current_char in ransom_note_text.chars() {
        let updated_count = char_counts.entry(current_char).or_insert(0);
        *updated_count -= 1; // @step:decrement-count
        if *updated_count < 0 {
            return false; // @step:complete
        }
        // @step:decrement-count
    }
    true // @step:complete
}
