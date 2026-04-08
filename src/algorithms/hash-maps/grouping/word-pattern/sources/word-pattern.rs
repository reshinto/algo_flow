// Word Pattern — check if a string follows a pattern using bidirectional hash map mapping
use std::collections::HashMap;

fn word_pattern(pattern: &str, sentence: &str) -> bool {
    let words: Vec<&str> = sentence.split(' ').collect(); // @step:initialize
    let mut char_to_word: HashMap<char, &str> = HashMap::new(); // @step:initialize
    let mut word_to_char: HashMap<&str, char> = HashMap::new(); // @step:initialize
    let pattern_chars: Vec<char> = pattern.chars().collect();
    if pattern_chars.len() != words.len() {
        return false; // @step:initialize
    }
    for char_index in 0..pattern_chars.len() {
        let pattern_char = pattern_chars[char_index];
        let current_word = words[char_index];
        let mapped_word = char_to_word.get(&pattern_char).copied(); // @step:lookup-key
        let mapped_char = word_to_char.get(current_word).copied(); // @step:lookup-key
        if mapped_word.is_none() && mapped_char.is_none() {
            char_to_word.insert(pattern_char, current_word); // @step:insert-key
            word_to_char.insert(current_word, pattern_char); // @step:insert-key
        } else if mapped_word == Some(current_word) && mapped_char == Some(pattern_char) {
            continue; // @step:key-found
        } else {
            return false; // @step:key-not-found
        }
    }
    true // @step:complete
}
