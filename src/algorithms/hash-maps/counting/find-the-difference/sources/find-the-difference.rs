// Find the Difference — find the extra character added to the modified string
use std::collections::HashMap;

fn find_the_difference(original: &str, modified: &str) -> char {
    let mut char_counts: HashMap<char, i32> = HashMap::new(); // @step:initialize
    for current_char in original.chars() {
        *char_counts.entry(current_char).or_insert(0) += 1; // @step:increment-count
    }
    for current_char in modified.chars() {
        let count = char_counts.entry(current_char).or_insert(0);
        *count -= 1; // @step:decrement-count
        if *count < 0 {
            return current_char; // @step:key-found
        }
    }
    ' ' // @step:complete
}
