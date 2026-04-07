// Isomorphic Strings — check if two strings are isomorphic using bidirectional char mapping
use std::collections::HashMap;

fn isomorphic_strings(text_a: &str, text_b: &str) -> bool {
    let mut a_to_b: HashMap<char, char> = HashMap::new(); // @step:initialize
    let mut b_to_a: HashMap<char, char> = HashMap::new(); // @step:initialize
    if text_a.len() != text_b.len() {
        return false; // @step:initialize
    }
    let chars_a: Vec<char> = text_a.chars().collect();
    let chars_b: Vec<char> = text_b.chars().collect();
    for char_index in 0..chars_a.len() {
        let char_a = chars_a[char_index];
        let char_b = chars_b[char_index];
        let mapped_b = a_to_b.get(&char_a).copied(); // @step:lookup-key
        let mapped_a = b_to_a.get(&char_b).copied(); // @step:lookup-key
        if mapped_b.is_none() && mapped_a.is_none() {
            a_to_b.insert(char_a, char_b); // @step:insert-key
            b_to_a.insert(char_b, char_a); // @step:insert-key
        } else if mapped_b == Some(char_b) && mapped_a == Some(char_a) {
            continue; // @step:key-found
        } else {
            return false; // @step:key-not-found
        }
    }
    true // @step:complete
}
